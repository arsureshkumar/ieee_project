// This file is for handling api routes

// localhost Django URL for now
const apiUrl = 'http://localhost:8000/api';

export async function registerUser(username: string, password: string, base64ImageData: string): Promise<any> {
    
    try {
      const response = await fetch(`${apiUrl}/receiveImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, image: base64ImageData }),
      });
  
      if (!response.ok) {
        throw new Error('Registeration failed :(');
      }
  
      console.log('Registeration successfull!');
      return response;

    } catch (error) {
      console.error('Error uploading image:', error);
    } 
  }

  export async function getAllUsers(): Promise<any> {
 
    try {
        const response = await fetch(`${apiUrl}/getUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
    
        return response.json();

      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
 }

 export async function userFileUpload(username: string, base64ImageData: string): Promise<any> {
    
  try {
    const response = await fetch(`${apiUrl}/fileUpload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, file: base64ImageData }),
    });

    if (!response.ok) {
      throw new Error('Upload failed :(');
    }

    console.log('Upload successful!');
    return response;

  } catch (error) {
    console.error('Error uploading file:', error);
  } 
}

 export async function getUserFiles(username: string): Promise<any> {
 
  try {
      const response = await fetch(`${apiUrl}/getUserFiles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return response.json();

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}