"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/UI/footer";
import Header from "@/UI/header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();

  interface Product {
    id: string ;
    title: string;
    category: string;
    price: number;
    rating: number;
    description: string;
    thumbnail: string;
    images: string[];
  }

  interface CartItem {
    id: string;
    quantity: number;
    name: string;
    img: string;
    price: number;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart?.items ?? []);
  const itemInCart = product
  ? cartItems.find(item => item.id === product.id)
  : null;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-5">Không tìm thấy sản phẩm!</p>;
  }

  return (
    <>
      <Header />

      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop Detail</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/shop">Shop</Link>
          </li>
          <li className="breadcrumb-item active text-white">Shop Detail</li>
        </ol>
      </div>

      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <img src={product.thumbnail} className="img-fluid rounded" alt={product.title} />
                  </div>
                </div>

                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product.title}</h4>
                  <p className="mb-3 text-capitalize">Category: {product.category.replace("-", " ")}</p>
                  <h5 className="fw-bold mb-3 text-primary">${product.price}</h5>
                  <div className="d-flex mb-4 text-warning">
                    {"★".repeat(Math.round(product.rating))} <small className="text-dark ms-2">({product.rating}/5)</small>
                  </div>
                  <p className="mb-4">{product.description}</p>

                  {itemInCart ? (
                    <div className="d-flex flex-column gap-2 align-items-start mb-4">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                sp: {
                                  id: product.id,
                                  name: product.title,
                                  img: product.thumbnail,
                                  price: product.price,
                                },
                                sl: -1,
                              })
                            )
                          }
                          disabled={itemInCart.quantity <= 1}
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <span className="fs-5">{itemInCart.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                sp: {
                                  id: product.id,
                                  name: product.title,
                                  img: product.thumbnail,
                                  price: product.price,
                                },
                                sl: 1,
                              })
                            )
                          }
                        >
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                      <div className="d-flex gap-2">
                        <Link href="/cart" className="btn btn-success">
                          <i className="fas fa-shopping-cart me-2" /> View Cart
                        </Link>
                        <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(product.id))}>
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary border-secondary rounded-pill px-4 py-2 mb-4"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            sp: { id: product.id, name: product.title, img: product.thumbnail, price: product.price },
                            sl: 1,
                          })
                        )
                      }
                      type="button"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-xl-3">
              <div className="mb-4">
                <h4>Categories</h4>
                <ul className="list-unstyled fruite-categorie">
                  {["Beauty", "Fragrances", "Furniture", "Groceries", "Home Decoration", "Kitchen Accessories", "Laptops"].map((cat, i) => (
                    <li key={i}>
                      <div className="d-flex justify-content-between fruite-name">
                        <Link href={`/shop/${cat.toLowerCase().replaceAll(" ", "-")}`}>
                          <i className="fas fa-apple-alt me-2" />
                          {cat}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <h3 className="fw-bold mb-4">Related Products</h3>
          <div className="row g-4">
            {product.images?.slice(0, 4).map((img: string, index: number) => (
              <div key={index} className="col-md-3">
                <div className="border rounded p-2 text-center">
                  <img src={img} alt="related" className="img-fluid rounded mb-2" style={{ height: 150, objectFit: "cover" }} />
                  <p className="mb-0 small">{product.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
