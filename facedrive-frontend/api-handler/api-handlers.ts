// This file is for handling api routes

// localhost Django URL for now
const apiUurl = 'http://localhost:8000/api';

export async function sendImage(base64ImageData: string): Promise<any> {
     // Replace with your Django API endpoint URL
    
    try {
      const response = await fetch(`${apiUurl}/receiveImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64ImageData }),
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      console.log('Image uploaded successfully');
      return response;

    } catch (error) {
      console.error('Error uploading image:', error);
    } 
  }

  export async function getTest(): Promise<any> {
    // Replace with your Django API endpoint URL
 
    try {
        const response = await fetch(`${apiUurl}/testReq`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
 }