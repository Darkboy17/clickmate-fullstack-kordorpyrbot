# **QueenLive - Fullstack Developer Assessment**

## **📌 Project Overview**
This project simulates a **real-time live commerce platform** with:
- **Frontend**: Live chat interface (Next.js + Socket.IO + Tailwind CSS)
- **Backend**: Order API with real-time notifications (NestJS + TypeORM + MySQL)

## **🚀 Features**
### **Frontend (Next.js)**
✔ **Live Shopping Room UI**  
✔ **Real-time Chat** (Socket.IO)  
✔ **Order Placement Button**  
✔ **Seller Dashboard** (Order Notifications)  
✔ **Responsive Design** (Tailwind CSS)  

### **Backend (NestJS)**
✔ **REST API** (`POST /orders`)  
✔ **Real-time Order Broadcast** (Socket.IO)  
✔ **MySQL Database** (TypeORM)  

---

## **🛠 Local Setup & Installation**

### **Prerequisites**
- Node.js (v16+)
- MySQL
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/Darkboy17/clickmate-fullstack-kordorpyrbot
cd clickmate-fullstack-kordorpyrbot
```

### **2. Backend Setup**
>**Note**
> For a quick setup on Windows, the quickest thing you can do is simply *cd* into the 'frontend' folder. Then, create a `.env` file in the root directory and paste the following.

```bash
	NEXT_PUBLIC_API_URL=https://clickmateapi.duckdns.org
```
>*https://clickmateapi.duckdns.org* is a link to quickly access the API without any setup on your local machine. I deployed the API for easier access since the assessment requires only a deployed link of the frontend on vercel and connect to the MySQL locally. This solves the problem of not having MySQL installed on your local machine.

> But, if you want to connect locally, change the .env file to this:
```bash
	NEXT_PUBLIC_API_URL=https://localhost:3000
```

> Then cd into the backend folder and similarly, create a `.env` file in the root directory and paste the following:
```bash
	DB_ENV=local

	LOCAL_DB_USERNAME='your_username'

	LOCAL_DB_PASSWORD='your_password'

	LOCAL_DB_HOST=localhost	  

	DB_PORT=3306

	DB_NAME=queenlive
```

The `DB_NAME` assumes you already have created a database name called *queenlive*. You can point it to a database name of your choice. For the sake of this assessment, I have named it *queenlive* for relevancy.


> Finally, in your terminal run the following command:
```bash
npm run start:dev
```
> Please check the terminals, there shoud be no errors indicated by this 

>"Found 0 errors. Watching for file changes." 

>All the log messages should also be in green font indicating successful initiation.
- Runs on **http://localhost:3000**

### **3. Frontend Setup**
```bash
cd ../frontend
npm install
```

#### **Run Frontend**
```bash
npm run dev
```
> *Note: May run on port 3001 or some other random port, since backend is running on port 3000 by default.*

- Runs on **http://localhost:3001**

---

 Now you can start using the application.

---

## **📂 Project Structure**
```
clickmate-fullstack-kordorpyrbot/
├── backend/            # NestJS API
│   ├── src/
│   │   ├── chat/       # gateway, module
│   │   └── config/     # MySQL config
│   │   ├── orders/     # entity, service, controller, dto, gateway, module
│   │   ├── sellers/    # gateway, module
│   └── package.json
│
├── frontend/                # Next.js app
│   ├── src/
│   │   ├── app/             
│   │		├── components/      # React components
│   │		├── context/         # Socket context
│   │		├── services/        # API Service
│   └── package.json
│
└── README.md
```

---

## **🔌 API Specification**
### **Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/orders` | Create a new order |
| `GET`  | `/orders` | List all orders |

#### **Order Payload Example**
```json
{
  "productId": 101,
  "buyer": "John Doe",
  "quantity": 1
}
```

---

## **🔗 Socket.IO Events**
| Event | Direction | Description |
|-------|-----------|-------------|
| `chat-message	` | Client → Server | Send a chat message |
| `placeOrder` | Client → Server | Submit an order |
| `new-order` | Server → Client | Notify order success |

---


### **Frontend Testing**
1. Open **http://localhost:3001** in two tabs.
2. Click "Join as Seller" on one tab.
3. Send messages & place orders from the other tab to verify real-time updates.

---

## **📬 Contact**
For questions, email: **opcodegenerator@gmail.com**  

---
