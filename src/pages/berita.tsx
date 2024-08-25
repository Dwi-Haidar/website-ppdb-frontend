import { Box, Typography, CircularProgress, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CardBerita from '../components/componentBerita/card';
import { useState, useEffect, useCallback, useRef } from 'react';
import { IBerita } from '../types/types';
import API from '../libs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { motion } from 'framer-motion';

const Berita = () => {
    const [berita, setBerita] = useState<IBerita[]>([]);
    const [filteredBerita, setFilteredBerita] = useState<IBerita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [latestNews, setLatestNews] = useState<IBerita[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const beritaPerPage = 4;
    const [animateKey, setAnimateKey] = useState<number>(0);


    const contentRef = useRef<HTMLDivElement>(null);

    const getBerita = async () => {
        try {
            const res = await API.get('berita');
            const beritaData = res.data.data;
            setBerita(beritaData);
            setFilteredBerita(beritaData);

            if (beritaData.length > 0) {
                setLatestNews(beritaData.slice(0, 5));
            }
        } catch (error) {
            setError('Gagal memuat berita');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBerita();
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    const handleSearch = () => {
        const filtered = berita.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Article.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBerita(filtered);
        setCurrentPage(0);
        setAnimateKey(prevKey => prevKey + 1);
    };

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
    };

    const handlePageChange = useCallback((event: { selected: number }) => {
        setCurrentPage(event.selected);
        setAnimateKey(prevKey => prevKey + 1);
    }, []);

    const indexOfLastBerita = (currentPage + 1) * beritaPerPage;
    const indexOfFirstBerita = indexOfLastBerita - beritaPerPage;
    const currentBerita = filteredBerita.slice(indexOfFirstBerita, indexOfLastBerita);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box padding={10} mt={10} ref={contentRef}>
            <Typography variant="h4" component="h1" gutterBottom>
                Berita
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
                <Box flexGrow={1}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        {currentBerita.map((item) => (
                            <motion.div
                                key={item.id + animateKey}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CardBerita
                                    name={item.name}
                                    fotoBerita={`http://localhost:5001/uploads/${item.fotoBerita}`}
                                    Article={item.Article}
                                    createdAt={item.createdAt}
                                    id={item.id}
                                />
                            </motion.div>
                        ))}
                    </Box>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(filteredBerita.length / beritaPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-end" ml={2}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <TextField
                            variant="outlined"
                            size="small"
                            label="Cari Berita"
                            placeholder="Masukkan kata kunci..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: '270px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ced4da',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#80bdff',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0056b3',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{
                                backgroundColor: '#007bff',
                                '&:hover': {
                                    backgroundColor: '#0056b3',
                                },
                            }}
                        >
                            Cari
                        </Button>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                        <Typography variant="body1" gutterBottom sx={{ borderBottom: '2px solid #007bff', paddingBottom: '4px', marginBottom: '8px' }}>
                            TERBARU
                        </Typography>
                        {latestNews.map((item) => (
                            <Box key={item.id} >
                                <Typography sx={{ fontWeight: 100, fontSize: '15px', color: '#6ca3df', cursor: 'pointer' }}>
                                    {item.name} <span style={{ color: '#8f8978', fontSize: '12px', fontWeight: 500, fontFamily: 'revert-layer' }}> {moment(item.createdAt).format('DD MMM YYYY')}</span>
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box mt={2}>
                        <Calendar
                            style={{ width: "400px" }}
                            onChange={handleDateChange}
                            value={date}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Berita;
