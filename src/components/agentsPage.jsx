import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const AgentsPage = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={4} height='50%'>
                    <Card>
                        <CardContent>
                        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>agent Name</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={4} height='50%'>
                    <Card>
                        <CardContent>
                        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>agent Name</Typography>
                        </CardContent>                    </Card>
                </Grid>
                <Grid size={4} height='50%'>
                    <Card>
                        <CardContent>
                        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>agent Name</Typography>
                        </CardContent>                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AgentsPage;