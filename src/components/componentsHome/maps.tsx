import { Box } from "@mui/material"

const Maps: React.FC = () => {
    return (
        <Box >
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2864634561556!2d106.86907377441364!3d-6.485360763406607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c046ae7c429d%3A0x5e236c619c82b96f!2sSMP%20Islam%20Karya%20Mukti!5e0!3m2!1sid!2sid!4v1723459460725!5m2!1sid!2sid"
                width="300"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </Box>
    )
}

export default Maps;
