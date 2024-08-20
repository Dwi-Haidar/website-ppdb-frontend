import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import { Kelulusan } from "../types/types";
import SearchIcon from '@mui/icons-material/Search';
const DataKelulusan: React.FC = () => {
    const [kelulusanData, setKelulusanData] = useState<Kelulusan[]>([]);
    const [nisn, setNisn] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 5;

    const getKelulusan = async () => {
        try {
            const res = await axios.get("http://localhost:5001/kelulusan");
            setKelulusanData(res.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getKelulusan();
    }, []);

    const filteredData = kelulusanData.filter(data =>
        data.ppdb.nisn.toLowerCase().includes(nisn.toLowerCase())
    );

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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '1rem', }}>
                    <Card sx={{ width: '100%', maxWidth: 400, padding: 3, boxShadow: 3, borderRadius: 2, mb: 4 }}>
                        <Typography variant="h6" mb={2}>Cari Data Siswa Berdasarkan NISN</Typography>
                        <TextField
                            label="Masukkan NISN"
                            variant="outlined"
                            size="small"
                            value={nisn}
                            onChange={(e) => setNisn(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton edge="end" aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                            sx={{
                                width: '100%',
                                backgroundColor: '#f5f5f5',
                                borderRadius: 2,
                            }}
                        />
                    </Card>
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
                                Status Kelulusan
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
                        {currentItems.map((data) => (
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
                                    {data.statusKelulusan ? "Lulus" : "Tidak Lulus"}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {data.ppdb.nik}
                                </td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    {data.ppdb.ttl}
                                </td>
                            </tr>
                        ))}
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
