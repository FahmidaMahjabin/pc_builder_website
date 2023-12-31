import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import Banner from "@/components/UI/Banner";

import { useGetAllproductQuery } from "@/redux/api/apiSlice";
import dynamic from "next/dynamic";
import AllProducts from "@/components/UI/AllProducts";
const HomePage = ({ product }) => {
  // console.log("product:", product);
  const { data, isLoading } = useGetAllproductQuery();
  const allproducts = data?.data;
  console.log("allproducts:", allproducts);
  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <h1>Loading</h1>,
    ssr: false,
  });
  return (
    <>
      <Head>
        <title>PC-Builder Website</title>
        <meta
          name="description"
          content="This is a PC builder website. Where you can make PC according to your choice."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicBanner></DynamicBanner>
      <AllProducts allproducts={allproducts}></AllProducts>
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
// using json-server
// export const getServerSideProps = async () => {
//   const res = await fetch("https://book-library-server-green.vercel.app/product");
//   const product = await res.json();
//   console.log("product:", product);
//   return { props: { product }, revalidate: 10 };
// };

// using nextjs's internal server and db mongodb
// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3000/api/product");
//   const data = await res.json();
//   console.log("data from getServerSideProps:", data);
//   const product = data?.data;
//   return { props: { product } };
// };

// export const getStaticProps = async () => {
//   await fetch("localhost:5000/product/all-products")
//     .then((res) => res.json())
//     .then((data) => {
//       const product = data.data;
//     });

//   console.log("product from getStaticProps:", product);
//   return {
//     props: {
//       product,
//     },
//   };
// };
