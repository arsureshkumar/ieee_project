// This file is for handling api routes

// localhost Django URL for now
const apiUrl = 'http://localhost:8000/api';

export async function loginUser(username: string, base64ImageData: string, password: any = false): Promise<any> {
    
  try {
    if (password) {
      const response = await fetch(`${apiUrl}/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, image: base64ImageData, password: password })
      });
    } else {
      const response = await fetch(`${apiUrl}/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, image: base64ImageData })
      });
    
    console.log(response)
    return response;

  }} catch (error) {
    console.error('Error uploading image:', error);
  } 
}

export async function registerUser(username: string, password: string, base64ImageData: string): Promise<any> {
    
    try {
      const response = await fetch(`${apiUrl}/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, image: base64ImageData }),
      });
      
      console.log(response)
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
    
        return response.json();

      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
 }