import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const PlaceDetails = ({ place }) => {
    const classes = useStyles();
    const days =[0, 1, 2, 3, 4, 5, 6];
    const dayNames = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    //console.log(place);
    const [seeHours, setSeeHours] = useState(true);

    return (
        /* {6} indicates drop shadow level*/ 
        <Card elevation={6}>
            <CardMedia 
                style = {{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' }
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>

                {/*displays ranking of location */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.hours?.week_ranges ?
                <button className={classes.hoursButton} onClick={() => setSeeHours(!seeHours)}>Show Hours</button> : <p></p>
                }
                {seeHours? <p></p> :
                    <Box>
                        {days.map((day) => (
                            
                            <Typography variant="subtitle1" color="textSecondary">
                                {dayNames[day]} :
                                {place?.hours?.week_ranges[day].map((hour) => {
                                    var openHour = hour.open_time/60;
                                    openHour = Math.floor(openHour);
                                    //console.log(openHour);
                                    var openMin = hour.open_time % 60;

                                    var closeHour = hour.close_time/60;
                                    closeHour = Math.floor(closeHour);
                                    var closeMin = hour.close_time %60;

                                    if(openMin === 0) {
                                        openMin = "00";
                                    }

                                    if(closeMin === 0) {
                                        closeMin = "00";
                                    }

                    
                                    if(openHour > 12) {
                                        if(closeHour > 12) {
                                            return <Typography variant="subtitle1" className={classes.dates}>{openHour % 12}:{openMin} pm - {closeHour %12}:{closeMin} pm</Typography>
                                        }
                                        return <Typography variant="subtitle1" className={classes.dates}>{openHour % 12}:{openMin} pm - {closeHour %12}:{closeMin} am</Typography>
                                        
                                    }

                                    if(closeHour > 12) {
                                        return <Typography variant="subtitle1" className={classes.dates}>{openHour % 12}:{openMin} am - {closeHour %12}:{closeMin} pm</Typography>
                                    }
                                    return <Typography variant="subtitle1" className={classes.dates}>{openHour % 12}:{openMin} am - {closeHour %12}:{closeMin} am</Typography>
                                    
                                })}
                            </Typography>
            
                        ))}
                    </Box>
                }

                {/*Checks if there is location and if location has cuisines then displays it */}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}

                {/*Checks if there is location and displays address */}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}

                {/*Checks if there is location and displays phone number */}
                {place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;