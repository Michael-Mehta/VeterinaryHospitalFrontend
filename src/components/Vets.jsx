import { getVets, deleteVet } from '../services/vetService';
import { useEffect, useState } from 'react';
import VetModal from './VetModal';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState({});

  const handleDelete = async (vetId) => {
    try {
      const success = await deleteVet(vetId);
      if (success) {
        setVets(vets.filter((vet) => vet.id !== vetId));
        console.log('Vet deleted successfully');
      } else {
        console.error('Failed to delete vet');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createVet = () => {
    setSelectedVet({});
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVets();
        setVets(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Vets
      </Typography>

      <Button variant="contained" onClick={createVet} sx={{ mb: 2 }}>
        Add Vet
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        {vets.map((vet) => {
          const imageUrl = vet.image?.startsWith('http')
            ? vet.image
            : `http://localhost:8000${vet.image}`;

          return (
            <Card key={vet.id}>
              {vet.image && (
                <CardMedia
                  component="img"
                  height="300"
                  image={imageUrl}
                  alt={vet.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{vet.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Specialization: {vet.specialization}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSelectedVet(vet);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(vet.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>

      <VetModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedVet={selectedVet}
      />
    </>
  );
};

export default Vets;
