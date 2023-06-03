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

  export function uploadImage(username: string, file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const response = await fetch(`${apiUrl}/uploadImage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, filename: file.name, image: reader.result }),
          });
  
          const responseData = await response.json();
          resolve(responseData);
        } catch (error) {
          reject(error);
        }
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  export async function getuserImages(username: string): Promise<any> {
 
    try {
        const response = await fetch(`${apiUrl}/getImages?username=${username}`, {
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