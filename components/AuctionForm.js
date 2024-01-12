import { addDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import ImageUpload from "./ImageUpload";
import TextArea from "./textArea";

const AuctionForm = ({ setLoading, setItemUploaded, itemUploaded }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    starting_bid: "",
    duration: "1 day",
  });

  const [fieldErrors, setFieldErrors] = useState({
    title: null,
    description: null,
    image: null,
    starting_bid: null,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const calculateEndTime = (duration) => {
    //convert selected endtime to suitable Date type
    const currentDate = new Date();
    const durationParts = duration.split(" ");
    const unit = durationParts[1];
    const value = parseInt(durationParts[0]) + 1;

    let endTime = new Date(currentDate);

    switch (unit) {
      case "day":
        endTime.setDate(currentDate.getDate() + value);
        break;
      case "days":
        endTime.setDate(currentDate.getDate() + value);
        break;
      case "hour":
        endTime.setHours(currentDate.getHours() + value);
        break;
      default:
        break;
    }

    endTime.setUTCHours(endTime.getHours(), endTime.getMinutes(), 0, 0); // Use setUTCHours to ensure UTC time

    const formattedEndTime = endTime.toISOString().substring(0, 19) + "Z";

    return formattedEndTime;
  };

  const addItems = async () => {
    const endTime = formData.duration.trim()
      ? calculateEndTime("1 day")
      : calculateEndTime(formData.duration);
    setFormData((prev) => ({ ...prev, duration: endTime }));
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/items`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: uuidv4(),
          ...formData,
          current_bid: 0,
          seller: {
            email: session.user.email,
            image: session.user.image,
            name: session.user.name,
          },
          bidders: [],
          end_time: endTime,
        }),
      });

      if (res.ok) {
        setItemUploaded("Success");
      } else {
        setItemUploaded("Error");
      }
    } catch (error) {
      console.error("Error adding auction item:", error);
    }
    setLoading(false);
    console.log(itemUploaded);
  };

  const handleSubmit = async () => {
    // Validation for required fields
    const requiredFields = ["title", "description", "image", "starting_bid"];
    const newFieldErrors = {};

    for (const field of requiredFields) {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && !formData[field].trim())
      ) {
        newFieldErrors[field] = `${field} is required`;
      }
    }

    // Numeric value validation for starting_bid
    const numericFields = ["starting_bid"];
    for (const field of numericFields) {
      if (isNaN(formData[field]) || formData[field] < 0) {
        newFieldErrors[field] = `${field} must be a non-negative number`;
      }
    }

    // Set the new field errors
    setFieldErrors(newFieldErrors);
    console.log(Object.keys(newFieldErrors));
    if (Object.keys(newFieldErrors).length > 0) {
      return; // Stop the process if there are validation errors
    }

    try {
      await addItems();

      setSuccessMessage("Auction item added successfully!");
    } catch (error) {
      console.error("Error adding auction item:", error);
      setSuccessMessage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-2/4 flex items-center shadow-lg justify-center m-3">
      <div className="bg-white p-12 rounded-md shadow-xl max-w-3xl w-full text-gray-800">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Create Auction
        </h1>
        <ImageUpload
          formData={formData}
          setFormImage={setFormData}
          error={fieldErrors.image}
        />
        <div className="w-full space-y-6">
          <Input
            id="title"
            onChange={handleChange}
            type="text"
            value={formData.title}
            text="Title"
            name="title"
            error={fieldErrors.title}
            customClass="input-field"
          />
          <TextArea
            id="description"
            name="description"
            onChange={handleChange}
            type="text"
            value={formData.description}
            text="Description"
            error={fieldErrors.description}
          />

          <Input
            name="starting_bid"
            id="startingBid"
            onChange={handleChange}
            type="number"
            value={formData.starting_bid}
            text="Starting Bid"
            error={fieldErrors.starting_bid}
            customClass=""
          />
          <div>
            <label htmlFor="duration" className="block text-sm font-medium ">
              Auction Duration:
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 p-3 w-full border-2 rounded-md focus:outline-none text-lg"
            >
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-full hover:from-green-700 hover:to-green-800 focus:outline-none focus:shadow-outline-green transition duration-300"
          >
            Create Auction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionForm;
