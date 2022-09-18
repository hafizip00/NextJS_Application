import fs from "fs/promises";
import path from "path";
import React, { Fragment } from "react";

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <h2>{loadedProduct.name}</h2>
      <h2>{loadedProduct.desc}</h2>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "dummy-products.json");
  const jsonData = await fs.readFile(filePath);
  const Data = JSON.parse(jsonData);

  return Data.products;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const product = data.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetail;
