import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

interface PrestasiProps {
    name: string;
    article: string;
    fotoPrestasi: string;
}

const Prestasi: React.FC<PrestasiProps> = ({ name, article, fotoPrestasi }) => {
    return (
        <Card
            sx={{
                maxWidth: 345,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={fotoPrestasi}
                alt={name}
                sx={{
                    objectFit: 'cover',
                }}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '8px',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        textAlign: 'justify',
                    }}
                >
                    {article}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Prestasi;
