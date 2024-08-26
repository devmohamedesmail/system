import React, { useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomLoading from "../../custom/CustomLoading";
import { Reorder } from "framer-motion";
import { format, parseISO } from "date-fns";
import { FaDotCircle } from "react-icons/fa";

export default function CarsStage() {
  const { t } = useTranslation();
  const [stages, setStages] = useState([]);

  const fetchstages = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/stages`);
      setStages(response.data.data);
    } catch (error) {
      alert(t("error"));
    }
  };

  useEffect(() => {
    fetchstages();
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      const response = await axios.get(`${Setting.url}change/status`);
      fetchstages();
    } catch (error) {
      console.error('Error:', error.response); 
      alert(t("error"));
    }
  };
  return (
    <div className="p-2">
      <CustomPageTitle title={t("stages")} />
      <div className="container m-auto">
      <div className="grid grid-cols-1">
      {stages ? (
          <>
            {stages.length > 0 ? (
              <>
                <Reorder.Group values={stages} onReorder={setStages}>
                  {stages.map((stage) => (
                    <Reorder.Item key={stage.id} value={stage.id}>
                      <>
                        <div className="flex flex-col justify-center items-center py-5 my-3 ">
                          <div className="bg-white w-fit p-4 rounded-xl shadow-lg flex flex-col justify-center items-center">
                            <p className="font-bold">{stage.carNo}</p>
                            <p>{stage.name}</p>
                          </div>
                          <div className="flex my-5">
                            {stage.stages.map((stage) => (
                              <div
                                key={stage.id}
                                className="bg-white w-fit p-4 rounded-xl shadow-lg m-2 flex flex-col justify-center items-center"
                              >
                                <p>{stage.name}</p>
                                <p>{stage.worker}</p>
                                <p>
                                  {format(
                                    parseISO(stage.start),
                                    "dd/MM/yyyy HH:mm"
                                  )}
                                </p>
                                <p>
                                  {format(
                                    parseISO(stage.end),
                                    "dd/MM/yyyy HH:mm"
                                  )}
                                </p>
                                <p className="mt-3">
                                  {stage.status === "0" ? (
                                    <button
                                      className=""
                                      onClick={() =>
                                        handleChangeStatus(stage.id)
                                      }
                                    >
                                      <FaDotCircle color="red" size={30} />{" "}
                                    </button>
                                  ) : (
                                    <button>
                                      <FaDotCircle color="green" size={30} />
                                    </button>
                                  )}
                                </p>
                              </div>
                            ))}
                          </div>
                          <hr className="h-1 w-full bg-white" />
                        </div>
                      </>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </>
            ) : (
              <> no </>
            )}
          </>
        ) : (
          <div className="bg-white my-5 p-10">
            <CustomLoading />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
