// defines interface used by the pig service (which is injected into our add form and table component)
export interface pig {
    personName: string;
    personNumber: string;
    pigBreed: string;
    pigID: string; //
    location: string;
    latitude: string;
    longitude: string;
    dateReported: string;
    timeReported: string;
    extraNotes?: string; 
}