import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Kelulusan } from "../types/types";

const DataKelulusan: React.FC = () => {
    const [kelulusanData, setKelulusanData] = useState<Kelulusan[]>([]);
    const [filteredData, setFilteredData] = useState<Kelulusan[]>([]);
    const [nisn, setNisn] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 5;

    const getKelulusan = async () => {
        try {
            const res = await axios.get("http://localhost:5001/kelulusan");
            setKelulusanData(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getKelulusan();
    }, []);

    useEffect(() => {

        if (nisn) {
            setFilteredData(
                kelulusanData.filter(data =>
                    data.ppdb.nisn.toLowerCase().includes(nisn.toLowerCase())
                )
            );
        } else {
            setFilteredData(kelulusanData);
        }
        setCurrentPage(0); // Reset to first page on search
    }, [nisn, kelulusanData]);

    const currentItems = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    return (
        <Box className="flex flex-col items-center mt-20">
            <div className="overflow-x-auto w-[96%] mb-4">


                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Data Murid</Typography>
                </Box>
                <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                                Foto
                            </th>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                                NISN
                            </th>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                                Status Murid
                            </th>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                                NIK
                            </th>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">
                                Tempat Tanggal Lahir
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((data) => (
                                <tr key={data.id}>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                                        <img
                                            src={`http://localhost:5001/uploads/${data.ppdb.fotoMurid}`}
                                            alt="foto"
                                            style={{ width: "30px", height: "30px" }}
                                        />
                                    </td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                                        {data.ppdb.nisn}
                                    </td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                                        {data.statusKelulusan ? "Diterima" : "Tidak Diterima"}
                                    </td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                                        {data.ppdb.nik}
                                    </td>
                                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                                        {data.ppdb.ttl}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-3 px-4 border-b text-sm text-gray-700 text-center">
                                    Data tidak ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                className="flex justify-center items-center space-x-2 text-gray-500 mt-4"
            />
        </Box>
    );
};

export default DataKelulusan;
