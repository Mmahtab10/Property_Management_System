import React, { useEffect, useMemo } from "react";
import { useTable } from "react-table";
import NavBar from "./NavBarComponent";
import FooterComp from "./FooterComp";
import Button from "./interactionComponents/Button";
import { getAllReportedListings, getAllUnapprovedUsers, updateSellerStatus } from "../apiUtil";

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

const AdminVetPage = (props) => {
    const {navigate,
        setAdminDashboard,
        adminDashboard,
        isMobile,} = props;
    const tableData = adminDashboard?.unapprovedUsers || [];

    useEffect(() => {
        // API Comment
        getAllUnapprovedUsers().then(response => {
            setAdminDashboard('unapprovedUsers',response);
        })


        // setAdminDashboard(
        //     "unapprovedUsers",
        //     [
        //         {
        //             "id": 6,
        //             "email": "jimbob@example.com",
        //             "first_name": "Jim",
        //             "last_name": "Bob",
        //             "password": "269257d81cb562e0839ea544403803abc3fe90394e4d2fd65dd41181a9a",
        //             "salt": "random_salt6",
        //             "userType": "Seller",
        //             "approved": 0
        //         },
        //         {
        //             "id": 13,
        //             "email": "bob@example.com",
        //             "first_name": "Bob",
        //             "last_name": "Doe",
        //             "password": "$2b$10$vtid1yXVZY6/7/4U5uNZFOfXYmBGNStS99HztuyjB9gYvaK5Mw/1i",
        //             "salt": "$2b$10$vtid1yXVZY6/7/4U5uNZFO",
        //             "userType": "Seller",
        //             "approved": 0
        //         }
        //     ]
        // );
    }, []);

    const data = useMemo(() => {
        return tableData || [];
    }, [tableData]);

    const handleViewClick = (key, id) => {
        const stateObject = tableData[id];
        const payload = {
            action: key,
            id: stateObject?.id
        };
        try {
            updateSellerStatus(payload).then(response => {
                window.alert(response);
                getAllUnapprovedUsers().then(response => {
                    setAdminDashboard('unapprovedUsers',response);
                })
            });
        } catch (e) {
            console.error('error in updating listing status');
        }


    };

    const columns = useMemo(() => {
        return [
            {
                Header: "First Name",
                accessor: "first_name",
            },
            {

                Header: "Last Name",
                accessor: "last_name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Approve",
                Cell: (info) => {
                    const id = info.cell.row.id;
                    return (
                        <Button
                            title={"Approve"}
                            buttonClass="text-black border-2 rounded-none border-black"
                            onClick={() => handleViewClick("approve", parseInt(id))}
                        />
                    );
                },
            },
            {
                Header: "Delete",
                Cell: (info) => {
                    const id = info.cell.row.id;
                    return (
                        <Button
                            title={"Delete"}
                            buttonClass="text-black border-2 rounded-none border-black"
                            onClick={() => handleViewClick("delete", parseInt(id))}
                        />
                    );
                },
            },
        ];
    }, [data]);

    return (
        <div className="text-white">
            <div className="bg-black">
                <NavBar navigate={navigate} loggedIn isMobile={isMobile} {...props} />
            </div>
            <div
                className="text-black text-center p-10 listing-bg-image"
                style={{ height: "70vh" }}
            >
                <div
                    className=" font-bold py-2 bg-white"
                    style={{ fontSize: "1.5rem" }}
                >
                    Unapproved Sellers
                </div>
                <Table columns={columns} data={data} />
            </div>
            <div>
                <FooterComp  ignoreAbsolute {...props}/>
            </div>
        </div>
    );
};

export default AdminVetPage;
