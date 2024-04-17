"use client";

import { fetchCars } from "@utils";
import { HomeProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";
import { useEffect, useState } from "react";
import Image from "next/image";

// export default async function Home({ searchParams }: HomeProps) {
//   const allCars = await fetchCars({
//     manufacturer: searchParams.manufacturer || "",
//     year: searchParams.year || 2022,
//     fuel: searchParams.fuel || "",
//     limit: searchParams.limit || 10,
//     model: searchParams.model || "",
//   });

//   const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

//   return (
//     <main className="overflow-hidden">
//       <Hero />

//       <div className="mt-12 padding-x padding-y max-width" id="discover">
//         <div className="home__text-container">
//           <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
//           <p>Explore out cars you might like</p>
//         </div>

//         <div className="home__filters">
//           <SearchBar />

//           <div className="home__filter-container">
//             <CustomFilter title="fuel" options={fuels} />
//             <CustomFilter title="year" options={yearsOfProduction} />
//           </div>
//         </div>

//         {!isDataEmpty ? (
//           <section>
//             <div className="home__cars-wrapper">
//               {allCars?.map((car) => (
//                 <CarCard car={car} />
//               ))}
//             </div>

//             <ShowMore
//               pageNumber={(searchParams.limit || 10) / 10}
//               isNext={(searchParams.limit || 10) > allCars.length}
//             />
//           </section>
//         ) : (
//           <div className="home__error-container">
//             <h2 className="text-black text-xl font-bold">Oops, no results</h2>
//             <p>{allCars?.message}</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// Client Side
export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const allCars = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      setAllCars(allCars);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [manufacturer, year, fuel, limit, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={(e) => setYear(parseInt(e))}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="w-full flex-center mt-10">
                <Image
                  src="/spinning-circles.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
