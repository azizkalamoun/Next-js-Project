import { useState } from "react";
import axios from "axios";

const EditForm = ({ product, onUpdate }) => {
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [img, setImg] = useState(product.img);
  const [prices, setPrices] = useState(product.prices);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        title,
        desc,
        img,
        prices,
        extraOptions,
      };

      const res = await axios.put(
        `http://localhost:3000/api/products/${product._id}`,
        updatedProduct
      );

      onUpdate(res.data); // Update the product in the parent component
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </label>
      <br />
      <label>
        Prices (comma-separated):
        <input
          type="text"
          value={prices.join(",")}
          onChange={(e) => setPrices(e.target.value.split(","))}
        />
      </label>
      <br />
      <label>
        Extra Options:
        <textarea
          value={JSON.stringify(extraOptions)}
          onChange={(e) => setExtraOptions(JSON.parse(e.target.value))}
        ></textarea>
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
