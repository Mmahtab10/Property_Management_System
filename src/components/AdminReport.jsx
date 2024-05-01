import React, { useEffect, useMemo } from "react";
import { useTable } from "react-table";
import NavBar from "./NavBarComponent";
import FooterComp from "./FooterComp";
import Button from "./interactionComponents/Button";
import { getAllReportedListings } from "../apiUtil";

const Table = ({ columns: userColumns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: userColumns,
      data,
    });

  return (
    <>
      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "2px solid black",
                    background: "lightgrey",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  background: i % 2 === 0 ? "white" : "lightgrey",
                  borderBottom: "1px solid black",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
};

const AdminReport = (props) => {
  const { navigate,
    setAdminDashboard,
    adminDashboard,
    isMobile, } = props;
  const tableData = adminDashboard?.reportedListings || [];

  useEffect(() => {
    // API Comment
    getAllReportedListings().then(response => {
      const newResponse = response.map((val) => {
        const tempdate = new Date(val.dateReported);
        const formattedDate = tempdate.toISOString().slice(0, 10);
        return {
          ...val,
          dateReported: formattedDate
        };
      })
      setAdminDashboard('reportedListings', newResponse);
    })

    // setAdminDashboard(
    //   "reportedListings",
    //   [
    //     {
    //       idREPORT: 2,
    //       idListing: 3,
    //       reportReason:
    //         "Incorrect information, Fake listing Incorrect Number of Bedrooms Incorrect Number of Bathrooms",
    //       dateReported: "2024-03-17T00:00:00.000Z",
    //       userID: "uuid-3C4D, uuid-5E6F uuid-8G9J uuid-8Q7U uuid-8Q7U",
    //     },
    //     {
    //       idREPORT: 3,
    //       idListing: 4,
    //       reportReason:
    //         "Incorrect information, Fake listing, Fake listing, Fake listing, Incorrect information",
    //       dateReported: "2024-03-18T00:00:00.000Z",
    //       userID: "uuid-3C4D, uuid-5E6F, uuid-5E6C, uuid-4B6A, uuid-1C6F",
    //     },
    //   ].map((val) => {
    //     return {
    //       ...val,
    //       dateReported: new Date(val.dateReported).toLocaleDateString(),
    //     };
    //   })
    // );
  }, []);

  const data = useMemo(() => {
    return tableData || [];
  }, [tableData]);

  const handleViewClick = (id) => {
    navigate("propertyScreen");
    setAdminDashboard("currentListing", data[id]);
  };

  const columns = useMemo(() => {
    return [
      {
        Header: "Listing #",
        accessor: "idListing",
      },
      {
        Header: "Date",
        accessor: "dateReported",
      },

      {
        Header: "View Details",
        Cell: (info) => {
          const id = info.cell.row.id;
          return (
            <Button
              title={"View"}
              buttonClass="text-black border-2 rounded-none border-black"
              onClick={() => handleViewClick(parseInt(id))}
            />
          );
        },
      },
    ];
  }, [data]);

  return (
    <div className="text-white">
      <div className="bg-black">
        <NavBar navigate={navigate} isMobile={isMobile} {...props} />
      </div>
      <div
        className="text-black text-center p-10 listing-bg-image"
        style={{ height: "70vh" }}
      >
        <div
          className=" font-bold py-2 bg-white"
          style={{ fontSize: "1.5rem" }}
        >
          Review List
        </div>
        <Table columns={columns} data={data} />
      </div>
      {/* <div className="bottom-0 absolute" style={{width: '-webkit-fill-available'}}> */}
      <div>
        <FooterComp ignoreAbsolute {...props}/>
      </div>
    </div>
  );
};

export default AdminReport;
