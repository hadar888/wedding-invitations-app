import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';

const coordinateToLonLat = (coordinate: number[]) => {
    return [coordinate[1], coordinate[0]];
};

const reverseGeocode = async (lonLat: number[]) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lonLat[0]}&lon=${lonLat[1]}&format=json`
        );
        const data = await response.json();
        const locationName = data.display_name;
        return locationName;
    } catch (error) {
        console.error('Error reverse geocoding:', error);
    }
};

interface LocationMapProps {
    weddingVenue: string;
    setWeddingVenue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setIsweddingVenueLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationMap = (props: LocationMapProps) => {
    const { weddingVenue, setWeddingVenue, setIsweddingVenueLoading } = props;
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    useEffect(() => {
        const mapObj = new Map({
            target: mapContainerRef.current as HTMLElement,
            layers: [new TileLayer({ source: new OSM() })],
            view: new View({
                center: fromLonLat([34.779348062249596, 32.065521461621906]),
                zoom: 9,
            }),
        });

        mapObj.on('click', async (event) => {
            const coordinate = event.coordinate;
            const lonLat = coordinateToLonLat(toLonLat(coordinate));
            setIsweddingVenueLoading(true);
            const weddingVenue = await reverseGeocode(lonLat);
            setIsweddingVenueLoading(false)
            setWeddingVenue(weddingVenue);
        });

        map.current = mapObj;

        return () => {
            mapObj.setTarget('');
        };
    }, [setIsweddingVenueLoading, setWeddingVenue]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const searchVenue = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(weddingVenue)}&format=json`
                );
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];

                    if (map.current) {
                        const view = map.current.getView();
                        view.setCenter(fromLonLat([parseFloat(lon), parseFloat(lat)]));
                        view.setZoom(15);
                    }
                }
            } catch (error) {
                console.error('Error fetching venue location:', error);
            }
        };

        if (weddingVenue) {
            searchVenue();
        }
    }, [weddingVenue]);

    return (<>
        <div id="map" ref={mapContainerRef} style={{ height: '210px', width: '100%' }}></div>
    </>);
};

export default LocationMap;
