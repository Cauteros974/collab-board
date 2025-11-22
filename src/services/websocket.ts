type Listener = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Listener[]> = new Map();

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => console.log('WS Connected');
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Expected structure { type: 'MESSAGE', payload: ... }
      if (this.listeners.has(data.type)) {
        this.listeners.get(data.type)?.forEach(cb => cb(data.payload));
      }
    };

    this.socket.onclose = () => console.log('WS Disconnected');
  }

  sendMessage(type: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.error('WS is not connected');
    }
  }

  subscribe(type: string, callback: Listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)?.push(callback);
  }

  disconnect() {
    this.socket?.close();
  }
}

export const wsService = new WebSocketService();