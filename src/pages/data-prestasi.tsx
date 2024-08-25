import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
    Box,
    Button,
    TextField,
    Typography,
    Modal,
    Fade,
    Backdrop,
    Alert,
} from "@mui/material";
import API from "../libs";
import { IPrestasi } from "../types/types";
import { toast } from 'react-toastify';

const DataPrestasi: React.FC = () => {
    const [newsData, setNewsData] = useState<IPrestasi[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    // const [newData, setNewData] = useState({
    //     name: "",
    //     Article: "",
    // });
    const [file, setFile] = useState<File | null>(null);
    const itemsPerPage = 5;
    const [editData, setEditData] = useState({
        id: null,
        name: "",
        Article: "",
        fotoPrestasi: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get<{
                    status: boolean;
                    message: string;
                    data: IPrestasi[];
                }>("prestasi");

                setNewsData(response.data.data);
                setError(null);
            } catch (error) {
                setError("Error fetching data. Please try again later.");
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const currentItems = newsData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setEditData({ id: null, name: "", Article: "", fotoPrestasi: "" });
        setFile(null);
    };

    const handleOpenEditModal = (data: IPrestasi) => {
        setEditData(data);
        setOpenModal(true);
    };

    const handleOpenConfirmModal = (id: number) => {
        setSelectedId(id);
        setOpenConfirmModal(true);
    };
    const handleCloseConfirmModal = () => setOpenConfirmModal(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("Article", editData.Article);
        if (file) {
            formData.append("fotoPrestasi", file);
        }

        try {
            if (editData.id) {

                await API.put(`prestasi/${editData.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success('Data successfully updated!');
            } else {

                await API.post("prestasi", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success('Data successfully posted!');
            }

            setOpenModal(false);
            setEditData({ id: null, name: "", Article: "", fotoPrestasi: "" });
            setFile(null);

            const response = await API.get("prestasi");
            setNewsData(response.data.data);
        } catch (error) {
            console.error("Error posting or updating data:", error);
            toast.error('Error posting or updating data. Please try again later.');
        }
    };

    const handleDelete = async () => {
        if (selectedId === null) return;

        try {
            await API.delete(`prestasi/${selectedId}`);
            setOpenConfirmModal(false);
            setSelectedId(null);
            // Refresh data after delete
            const response = await API.get("prestasi");
            setNewsData(response.data.data);
            toast.success('Item successfully deleted!');
        } catch (error) {
            console.error("Error deleting data:", error);
            setError("Error deleting item. Please try again later.");
            toast.error('Error deleting item. Please try again later.');
        }
    };

    return (
        <Box className="flex flex-col items-center mt-10">
            {error && <Alert severity="error">{error}</Alert>}

            <div className="overflow-x-auto w-[70%] mb-4">

                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenModal}
                        sx={{ borderRadius: 2, boxShadow: 2 }}
                    >
                        Post Prestasi
                    </Button>
                </Box>

                <table className="min-w-full bg-white shadow-md rounded-lg border border-black-200" style={{ width: "50%" }}>
                    <thead>
                        <tr>
                            <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700" style={{ width: "50px" }}>
                                Gambar Prestasi Sekolah
                            </th>
                            <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700" >
                                Judul
                            </th>
                            <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700" >
                                Article
                            </th>

                            <th className="py-1 px-4 bg-gray-100 border border-gray-400 text-left text-sm font-medium text-gray-700" >
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data) => (
                            <tr key={data.id}>
                                <td className="py-1 px-4 border-b text-sm text-gray-700 border border-gray-400">
                                    <img
                                        src={`http://localhost:5001/uploads/${data.fotoPrestasi}`}
                                        alt="gambar"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </td>
                                <td className="py-1 px-4 border-b text-sm text-gray-700 border border-gray-400">
                                    {data.name}
                                </td>
                                <td className="py-1 px-4 border-b text-sm text-gray-700 border border-gray-400">
                                    {data.Article}
                                </td>
                                <td className="py-1 px-4 border-b text-sm text-gray-700 border border-gray-400">
                                    <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleOpenEditModal(data)}
                                            sx={{ mr: 1, backgroundColor: "#7afc2f" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleOpenConfirmModal(data.id)}
                                            sx={{ mr: 1, backgroundColor: "blue" }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <ReactPaginate
                        pageCount={Math.ceil(newsData.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName="pagination flex justify-center"
                        pageClassName="page-item"
                        pageLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md"
                        activeClassName="active"
                        activeLinkClassName="bg-blue-500 text-white"
                        previousClassName="previous-page"
                        nextClassName="next-page"
                        previousLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md"
                        nextLinkClassName="page-link px-4 py-2 border border-gray-300 rounded-md"
                    />
                </Box>
            </div>

            {/* Modal for posting/editing data */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" component="h2" mb={2}>
                            {editData.id ? "Edit Prestasi" : "Post Prestasi"}
                        </Typography>
                        <TextField
                            label="Judul Prestasi Sekolah"
                            variant="outlined"
                            size="small"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Article Prestasi Sekolah"
                            variant="outlined"
                            size="small"
                            fullWidth
                            margin="normal"
                            name="Article"
                            value={editData.Article}
                            onChange={handleInputChange}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ marginTop: 16 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            {editData.id ? "Update" : "Post"}
                        </Button>
                    </Box>
                </Fade>
            </Modal>

            {/* Confirm Delete Modal */}
            <Modal
                open={openConfirmModal}
                onClose={handleCloseConfirmModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openConfirmModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" component="h2" mb={2}>
                            Konfirmasi Hapus
                        </Typography>
                        <Typography mb={2}>
                            Apakah Anda yakin ingin menghapus prestasi ini?
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDelete}
                            >
                                Hapus
                            </Button>
                            <Button variant="contained" onClick={handleCloseConfirmModal}>
                                Batal
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default DataPrestasi;
