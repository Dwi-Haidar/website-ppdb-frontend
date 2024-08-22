import { Box, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";

const ProfileSekolah: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Profile Sekolah
            </Typography>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Avatar
                                alt="Logo Sekolah"
                                src="/path/to/school-logo.jpg"
                                sx={{ width: 150, height: 150, margin: "auto" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Typography variant="h5" gutterBottom>
                                Nama Sekolah
                            </Typography>
                            <Typography variant="body1">
                                Alamat Sekolah: Jl. Contoh No. 123, Kota, Provinsi
                            </Typography>
                            <Typography variant="body1">
                                Telepon: (021) 123-4567
                            </Typography>
                            <Typography variant="body1">
                                Email: info@sekolah.com
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                Deskripsi singkat sekolah ini. Menyediakan informasi mengenai sejarah, visi, misi, dan berbagai program pendidikan yang ditawarkan.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfileSekolah;
