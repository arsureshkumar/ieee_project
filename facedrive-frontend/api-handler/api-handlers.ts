// This file is for handling api routes

// localhost Django URL for now
const url = 'http://localhost:8000/api/receiveImage';

export async function sendImage(base64ImageData: string): Promise<any> {
     // Replace with your Django API endpoint URL
  
    try {
      const response = await fetch(url, {
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
      return "POST req success!"

    } catch (error) {
      console.error('Error uploading image:', error);
    } 
  }