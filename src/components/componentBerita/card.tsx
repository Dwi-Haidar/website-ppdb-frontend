import { Box, Typography, CardMedia, Divider, Button } from '@mui/material';
import React from 'react';
import { FaClock } from "react-icons/fa";
import moment from 'moment';
import { Link } from 'react-router-dom';

interface CardBeritaProps {
    id: number;
    name: string;
    fotoBerita: string;
    Article: string;
    createdAt: Date;
}

const MAX_ARTICLE_LENGTH = 150;
const CardBerita: React.FC<CardBeritaProps> = ({ name, fotoBerita, Article, createdAt, id }) => {
    const truncatedArticle = Article.length > MAX_ARTICLE_LENGTH
        ? `${Article.substring(0, MAX_ARTICLE_LENGTH)}...`
        : Article;
    
    return (
        <Box sx={{ display: 'flex', width: '90%', height: '200px', alignItems: 'stretch' }}>
            <CardMedia
                component="img"
                image={fotoBerita}
                alt={name}
                sx={{ objectFit: 'cover', width: "300px", height: "100%" }}
            />
            <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {truncatedArticle}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display={"flex"} justifyContent="space-between" alignItems="center">
                    <Link to={`/detail-berita/${id}`}>
                        <Button variant="contained" color="primary">Read More</Button>
                    </Link>
                    <Box display={"flex"} gap={1} alignItems={"center"}>
                        <FaClock />
                        <Typography variant="caption" color="text.secondary" fontSize={14} fontWeight={500}>
                            {moment(createdAt).format('MMMM D, YYYY')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CardBerita;
