import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Setting } from "../../utilties/Setting";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthProvider";
import CustomLoading from "../../custom/CustomLoading";
import { format, parseISO } from "date-fns";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function Cars() {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState();
  const { auth, setauth } = useContext(AuthContext);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/stages`);
      setCars(response.data.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterCarsBySales();
  }, [auth]);

  const filterCarsBySales = () => {
    if (cars && cars.length > 0 && auth && auth.user) {
      const filteredCars = cars.filter((car) => car.sales === auth.user.name);
      setCars(filteredCars);
    }
  };

  return (
    <div className="p-2">
      <CustomPageTitle title={t("mycars")} />
      <div className="my-4 container m-auto">
        {cars ? (
          <>
            {cars.length > 0 ? (
              <div className="my-3">
                {cars.map((car) => (
                  <div
                    className={`flex items-center ${
                      i18n.language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="bg-white rounded-xl p-2 w-fit my-4 flex flex-col justify-center items-center px-5 py-5">
                      <p className="font-bold">{car.carNo}</p>
                      <p>
                        {car.carStatus === "0" ? (
                          <p className="text-green">{t("fixing")}</p>
                        ) : (
                          <p className="text-red-600">{t("notfixing")}</p>
                        )}
                      </p>
                    </div>

                    <div
                      className={`mx-2 flex  items-center justify-evenly flex-wrap ${
                        i18n.language === "ar" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <p
                        className={`bg-primary p-2 text-white rounded-xl flex items-center justify-center ${
                          i18n.language === "ar" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="mx-3">{t("stages")}</span>

                        {i18n.language === "ar" ? (
                          <FaLongArrowAltLeft />
                        ) : (
                          <FaLongArrowAltRight />
                        )}
                      </p>
                      <div className="flex flex-col justify-center items-center md:flex-row ">
                        {car.stages.map((stage) => (
                          <div className="flex flex-col justify-center items-center m-3 bg-white rounded-lg shadow-lg p-3 ">
                            <p>{stage.name}</p>
                            <p> {stage.worker}</p>
                            <p>
                              {" "}
                              {format(
                                parseISO(stage.start),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </p>
                            <p>
                              {" "}
                              {format(parseISO(stage.end), "dd/MM/yyyy HH:mm")}
                            </p>
                            <p className="my-3">
                              {stage.status === "0" ? (
                                <GoDotFill color="red" size={30} />
                              ) : (
                                <GoDotFill color="green" size={30} />
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>no cars</p>
            )}
          </>
        ) : (
          <>
            <CustomLoading />
          </>
        )}
      </div>
    </div>
  );
}
