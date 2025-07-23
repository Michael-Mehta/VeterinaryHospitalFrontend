import { getPets, deletePets } from '../services/petService';
import { useEffect, useState } from 'react';
import PetModal from './PetModal';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState({});

  const handleDelete = async (petId) => {
    try {
      const success = await deletePets(petId);
      if (success) {
        setPets(pets.filter((pet) => pet.id !== petId));
        console.log('Pet deleted successfully');
      } else {
        console.error('Failed to delete pet');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const createPet = () => {
    setSelectedPet({});
    setModalOpen(true);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pets
      </Typography>
      <Button variant="contained" onClick={createPet} sx={{ mb: 2 }}>
        Add Pet
      </Button>

      <Grid container spacing={3}>
        {pets.map((pet) => {
          const imageUrl = pet.image?.startsWith('http')
            ? pet.image
            : `http://localhost:8000${pet.image}`;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
              <Card>
                {pet.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={pet.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Species: {pet.species}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {pet.age}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setSelectedPet(pet);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(pet.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <PetModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedPet={selectedPet}
      />
    </>
  );
};

export default Pets;
