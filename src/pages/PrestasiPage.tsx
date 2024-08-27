import { Box, Typography, CircularProgress, Button, TextField, InputAdornment, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Cardprestasi from '../components/componentsHome/card-prestasi';
import { useState, useEffect, useCallback, useRef } from 'react';
import { IPrestasi } from '../types/types';
import API from '../libs';
import 'react-calendar/dist/Calendar.css';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { motion } from 'framer-motion';

const PrestasiPage = () => {
  const [prestasi, setPrestasi] = useState<IPrestasi[]>([]);
  const [filteredPrestasi, setFilteredPrestasi] = useState<IPrestasi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [latestPrestasi, setLatestPrestasi] = useState<IPrestasi[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const prestasiPerPage = 4;
  const [animateKey, setAnimateKey] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  const getPrestasi = async () => {
    try {
      const res = await API.get('prestasi');
      const prestasiData = res.data.data;
      setPrestasi(prestasiData);
      setFilteredPrestasi(prestasiData);

      if (prestasiData.length > 0) {
        setLatestPrestasi(prestasiData.slice(0, 5));
      }
    } catch (error) {
      setError('Gagal memuat prestasi');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrestasi();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleSearch = () => {
    const filtered = prestasi.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Article.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrestasi(filtered);
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

  const indexOfLastPrestasi = (currentPage + 1) * prestasiPerPage;
  const indexOfFirstPrestasi = indexOfLastPrestasi - prestasiPerPage;
  const currentPrestasi = filteredPrestasi.slice(indexOfFirstPrestasi, indexOfLastPrestasi);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={10} mt={10} ref={contentRef}>
      <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#79fa17" }}>
          Prestasi SMP Islam Karya Mukti
        </Typography>
        <Typography variant="h6" sx={{ color: "#555", marginTop: "10px" }}>
          Menampilkan berbagai prestasi gemilang siswa-siswi kami dalam berbagai bidang.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
        <Box flexGrow={1}>
          <Box display="flex" flexDirection="column" gap={3}>
            {currentPrestasi.map((item) => (
              <motion.div
                key={item.id + animateKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {item.fotoPrestasi ? (
                  <Cardprestasi
                    name={item.name}
                    fotoPrestasi={`http://localhost:5001/uploads/${item.fotoPrestasi}`}
                    Article={item.Article}
                    createdAt={item.createdAt}
                    id={item.id}
                  />
                ) : null}

              </motion.div>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              breakLabel={'...'}
              pageCount={Math.ceil(filteredPrestasi.length / prestasiPerPage)}
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
              label="Cari Prestasi"
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
            {latestPrestasi.map((item) => (
              <Box key={item.id}>
                <Typography sx={{ fontWeight: 100, fontSize: '15px', color: '#6ca3df', cursor: 'pointer' }}>
                  {item.name} <span style={{ color: '#8f8978', fontSize: '12px', fontWeight: 500, fontFamily: 'revert-layer' }}> {moment(item.createdAt).format('DD MMM YYYY')}</span>
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrestasiPage;
