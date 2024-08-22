import { Box, Typography, CardMedia, Divider, Button } from '@mui/material';
import React from 'react';
import { FaClock } from "react-icons/fa";
import moment from 'moment';

interface CardBeritaProps {
    name: string;
    fotoBerita: string;
    Article: string;
    createdAt: Date;
}

const MAX_ARTICLE_LENGTH = 150;
const CardBerita: React.FC<CardBeritaProps> = ({ name, fotoBerita, Article, createdAt }) => {
    const truncatedArticle = Article.length > MAX_ARTICLE_LENGTH
        ? `${Article.substring(0, MAX_ARTICLE_LENGTH)}...`
        : Article;
    return (
        <Box sx={{ display: 'flex', width: '90%', }} >
            <CardMedia
                component="img"

                image={fotoBerita}
                alt={name}
                sx={{ objectFit: 'cover', width: "300px", height: "200px" }}
            />
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {truncatedArticle}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display={"flex"} gap={2}>
                    <Button variant="contained" color="primary">Read More </Button>
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
