import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface CardEskulProps {
    id: number;
    name: string;
    fotoPrestasi: string;
    Article: string;
}

const Prestasicard: React.FC<CardEskulProps> = ({ name, fotoPrestasi, Article, id }) => {
    // Memotong artikel jika lebih dari 150 karakter
    const truncatedArticle = Article.length > 150 ? `${Article.slice(0, 150)}...` : Article;

    return (
        <Box sx={{
            width: 250, // Lebar card
            height: 340, // Tinggi card yang disesuaikan
            boxShadow: 3, // Menambahkan shadow
            borderRadius: 2, // Membulatkan sudut card
            overflow: 'hidden', // Menyembunyikan overflow
            transition: 'transform 0.3s ease', // Transisi saat hover
            '&:hover': {
                transform: 'scale(1.05)', // Zoom saat hover
                boxShadow: 2, // Shadow lebih besar saat hover
            },
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            position: 'relative'
        }}>
            <img
                src={fotoPrestasi}
                alt={name}
                style={{ width: '100%', height: '120px', objectFit: 'cover' }} // Sesuaikan tinggi gambar
            />
            <Box sx={{ padding: 1, flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4, // Membatasi jumlah baris teks
                }}>
                    {truncatedArticle}
                </Typography>
            </Box>
            <Box sx={{ padding: 1, textAlign: 'center' }}>
                <Link to={`/detail-prestasi/${id}`}>
                    <Button variant="contained" color="primary">
                        Read More
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Prestasicard;
