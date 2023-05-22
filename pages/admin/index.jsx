import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddButton from "../../components/AddButton";
import EditForm from "../../components/EditForm";
import Add from "../../components/Add";

const Index = ({ orders, products }) => {
  const [close, setClose] = useState(true);
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [editingProductId, setEditingProductId] = useState(null); // Track the currently editing product ID
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setPizzaList((prevList) =>
      prevList.map((pizza) =>
        pizza._id === updatedProduct._id ? updatedProduct : pizza
      )
    );
    setEditingProductId(null); 
  };

  const handleClearOrders = async () => {
    try {
      await axios.delete("http://localhost:3000/api/orders/");
      setOrderList([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
            
      <div className={styles.item}>
      {<AddButton setClose={setClose} />}
            {!close && <Add setClose={setClose} />}
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  {editingProductId === product._id ? (
                    <EditForm
                      product={product}
                      onUpdate={handleUpdateProduct}
                    />
                  ) : (
                    <>
                      <button
                        className={styles.button}
                        onClick={() => setEditingProductId(product._id)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
      <button className={styles.ClearButton} onClick={handleClearOrders}>
          Clear Orders
        </button>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
