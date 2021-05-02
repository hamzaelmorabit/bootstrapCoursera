import React, { useState } from "react";

//icons
import { RiCloseLine } from "react-icons/ri";

//modal
import { motion } from "framer-motion";

//syles
import styles from "./Details.styles";

export interface HistoryProps {
  woundItem_: any;
  setShowHistory: (val: null | boolean) => void;
  isClassify: boolean;
  setShowHistoryMeasure: (val: null | boolean) => void;
  measurmentHistory: any;
}

const History: React.FC<HistoryProps> = (props) => {
  const {
    setShowHistoryMeasure,
    setShowHistory,
    measurmentHistory,
    isClassify,
    woundItem_: {
      maximum_width,
      avg_depth,
      maximum_depth,
      maximum_length,
      area,
      volume,
      granulation,
      slough,
      eschar,
      last_update_date,
    },
  } = props;

  const table2 = [{ name: "hamza", w: "EL MORABIT" }];
  const defaultProps: any = {
    isClassify,
  };

  const classes = styles({ ...defaultProps });
  const currentMeasurement = [
    {
      last_update_date: last_update_date,
      maximum_width: maximum_width,
      avg_depth: avg_depth,
      maximum_depth: maximum_depth,
      maximum_length: maximum_length,
      area: area,
      volume: volume,
    },
  ];
  const currentClassify = [
    {
      last_update_date: last_update_date,
      granulation: granulation,
      slough: slough,
      eschar: eschar,
    },
  ];
  let arr;
  if (measurmentHistory) {
    arr = !isClassify
      ? [...measurmentHistory, ...currentMeasurement]
      : [...table2];
  } else {
    arr = !isClassify ? [...currentMeasurement] : [...currentClassify];
  }

  const dateFormat = (date: any) => {
    const date_array = date.split("-");
    let time = date_array[2].substring(2, date_array[2].length);
    return (
      date_array[2].substring(0, 2) +
      "/" +
      date_array[1] +
      "/" +
      date_array[0] +
      " " +
      time
    );
  };

  return (
    <>
      <motion.div className={classes.backModalHistory}>
        <motion.div className={classes.modalHistory}>
          <div
            style={{
              color: "black",
            }}
          >
            <RiCloseLine
              className={classes.btnClose}
              onClick={() => {
                !isClassify
                  ? setShowHistoryMeasure(null)
                  : setShowHistory(null);
              }}
              size={20}
            />

            <h5 className={classes.textCenter}>
              {isClassify ? "Tissue Classification" : "Measurement"} History
            </h5>
          </div>

          <div
            style={{
              color: "black",
              cursor: "default",
            }}
          >
            {arr.map((tab: any, index: number) => {
              return (
                <>
                  {isClassify ? (
                    <>
                      <span
                        style={{
                          fontSize: "13px",
                          float: "left",
                        }}
                        className={classes.dateUpdate}
                      >
                        {dateFormat(tab.last_update_date)}
                      </span>
                      <table
                        key={index}
                        className={classes.tableContent}
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                color: "rgba(255,0,0,1)",
                                float: "left",
                              }}
                            >
                              Red {tab.granulation + " %"}
                            </td>
                            <td
                              style={{
                                color: "rgba(243,190,87,1)",
                                textAlign: "center",
                              }}
                            >
                              Yellow {tab.slough + " %"}
                            </td>
                            <td
                              style={{
                                color: "rgba(116,158,178,1)",
                                float: "right",
                              }}
                            >
                              Blue {tab.eschar + " %"}
                            </td>
                          </tr>
                          <tr className="ele-m">
                            <td
                              className="td- ng-binding "
                              style={{ fontSize: "14px" }}
                            >
                              Type: None
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <>
                      <span className={classes.dateUpdate}>
                        {dateFormat(tab.last_update_date)}
                      </span>
                      <table
                        key={index}
                        className={classes.tableContent}
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              Area {tab.area} cm<sup>2</sup>
                            </td>
                            <td>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Volume {tab.volume}{" "}
                              cm
                              <sup>3</sup>
                            </td>
                            <td style={{ float: "right" }}>
                              &nbsp;&nbsp;&nbsp; Depth Max {tab.maximum_depth}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Length{" "}
                              {tab.maximum_length ? tab.maximum_width : "-"} cm
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                              }}
                            >
                              Width{" "}
                              {tab.maximum_width ? tab.maximum_width : "-"} cm
                            </td>
                            <td style={{ float: "right", marginRight: "3px" }}>
                              Depth Avg {tab.avg_depth}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: "14px" }}>Type: None</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                  <span
                    style={{
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    Reason: -
                  </span>
                  <hr className={classes.lineHorizontal} />
                </>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
export default History;
