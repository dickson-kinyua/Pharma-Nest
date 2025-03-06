"use client";
import { useState } from "react";

const CreateForm = () => {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", await convertToBase64(image)); // Convert image

    console.log([...formData]); // Debugging

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Product added Successfully 🎉");
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage(null);
      } else {
        setMessage("Error: " + result.message);
      }
    } catch (error) {
      setMessage("Failed to create post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 border rounded bg-white m-3 p-2"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold">Add a new product</h2>
      <input
        type="text"
        required
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full "
      />
      <input
        type="text"
        required
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full "
      />
      <input
        type="number"
        required
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full "
      />
      <select
        className="w-1/2 bg-gray-200 p-2"
        onChange={(e) => setCategory(e.target.value)}
        aria-placeholder="Select Category"
      >
        <option value="liquid">Liquid</option>
        <option value="tablet">Tablets</option>
        <option value="capsule">Capsule</option>
        <option value="topical">Topical</option>
        <option value="suppository">Suppository</option>
        <option value="inhaler">Inhaler</option>
        <option value="injection">Injection</option>
        <option value="drop">Drop</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])} //store single file
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-fit px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Create Product"}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
};

export default CreateForm;
