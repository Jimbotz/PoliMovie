import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Clock, Calendar } from 'lucide-react'
//import './App.css'

const movies = [
  { 
    id: 1, 
    title: "Guasón 2: Folie À Deux", 
    image: "/placeholder.svg?height=300&width=200",
    synopsis: "Arthur Fleck regresa en esta secuela musical, explorando nuevas profundidades de su locura junto a su compañera Harley Quinn.",
    categories: ["Drama", "Crimen", "Musical"]
  },
  { 
    id: 2, 
    title: "Mi Amigo El Pingüino", 
    image: "/placeholder.svg?height=300&width=200",
    synopsis: "Un niño forma una amistad única con un pingüino perdido, llevándolos a ambos a una aventura inolvidable.",
    categories: ["Familia", "Aventura", "Comedia"]
  },
  { 
    id: 3, 
    title: "Robot Salvaje", 
    image: "/placeholder.svg?height=300&width=200",
    synopsis: "En un futuro distópico, un robot desarrolla conciencia y debe luchar por su libertad en un mundo que teme a la inteligencia artificial.",
    categories: ["Ciencia Ficción", "Acción", "Thriller"]
  },
  { 
    id: 4, 
    title: "La Sustancia", 
    image: "/placeholder.svg?height=300&width=200",
    synopsis: "Un grupo de científicos descubre una misteriosa sustancia que altera la realidad, desatando consecuencias inesperadas y aterradoras.",
    categories: ["Terror", "Misterio", "Ciencia Ficción"]
  },
]

const generateSeats = () => {
  const rows = 'ABCDEF'.split('')
  return rows.map(row => ({
    row,
    seats: Array.from({ length: 10 }, (_, i) => ({
      id: `${row}${i + 1}`,
      number: i + 1,
      isOccupied: Math.random() < 0.2,
      isDisabled: Math.random() < 0.05,
    }))
  }))
}

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedSeats, setSelectedSeats] = useState([])
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [seats] = useState(generateSeats())

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie)
    setIsDialogOpen(true)
    setSelectedDate("")
    setSelectedTime("")
    setSelectedSeats([])
    setPaymentComplete(false)
  }

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    )
  }

  const handlePayment = () => {
    if (selectedMovie && selectedDate && selectedTime && selectedSeats.length > 0) {
      setPaymentComplete(true)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-[#2c0a0a] text-[#f5e6e6] min-h-screen max-w-screen-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ff9999]">MoviePoli</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {movies.map((movie) => (
          <Card key={movie.id} className="cursor-pointer bg-[#4d1a1a] border-[#801515]" onClick={() => handleMovieSelect(movie)}>
            <CardContent className="p-0">
              <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
            </CardContent>
            <CardFooter className="p-2">
              <p className="text-sm font-semibold text-[#ff9999]">{movie.title}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#4d1a1a] text-[#f5e6e6] border-[#801515]">
          {selectedMovie && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#ff9999]">{selectedMovie.title}</DialogTitle>
                <DialogDescription className="text-[#d68f8f]">
                  {selectedMovie.synopsis}
                  <div className="mt-2">
                    {selectedMovie.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-[#801515] text-[#f5e6e6]">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="date" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="date" className="text-[#ff9999]"><Calendar className="mr-2 h-4 w-4" /> Fecha</TabsTrigger>
                  <TabsTrigger value="time" className="text-[#ff9999]"><Clock className="mr-2 h-4 w-4" /> Hora</TabsTrigger>
                  <TabsTrigger value="seats" className="text-[#ff9999]"><ShoppingCart className="mr-2 h-4 w-4" /> Asientos</TabsTrigger>
                </TabsList>
                <TabsContent value="date">
                  <Select onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-full bg-[#3c1414] text-[#f5e6e6] border-[#801515]">
                      <SelectValue placeholder="Selecciona una fecha" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3c1414] text-[#f5e6e6] border-[#801515]">
                      <SelectItem value="2023-10-06">6 de Octubre, 2023</SelectItem>
                      <SelectItem value="2023-10-07">7 de Octubre, 2023</SelectItem>
                      <SelectItem value="2023-10-08">8 de Octubre, 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="time">
                  <Select onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full bg-[#3c1414] text-[#f5e6e6] border-[#801515]">
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3c1414] text-[#f5e6e6] border-[#801515]">
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="16:30">16:30</SelectItem>
                      <SelectItem value="19:00">19:00</SelectItem>
                      <SelectItem value="21:30">21:30</SelectItem>
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="seats">
                  <div className="mb-4">
                    <div className="w-full h-8 bg-[#801515] rounded-t-lg mb-4 flex items-center justify-center text-sm text-[#f5e6e6]">Pantalla</div>
                    <div className="grid grid-cols-11 gap-2 mb-4">
                      {seats.map(row => (
                        <React.Fragment key={row.row}>
                          <div className="flex items-center justify-end mr-2">
                            <span className="font-bold text-[#ff9999]">{row.row}</span>
                          </div>
                          {row.seats.map(seat => (
                            <button
                              key={seat.id}
                              className={`w-8 h-8 rounded-t-lg relative ${
                                seat.isOccupied ? 'bg-[#1a0505] cursor-not-allowed' :
                                seat.isDisabled ? 'bg-[#3b82f6] cursor-not-allowed' :
                                selectedSeats.includes(seat.id) ? 'bg-[#801515] text-[#f5e6e6]' : 'bg-[#b25959] text-[#f5e6e6] hover:bg-[#ff9999] hover:text-[#2c0a0a]'
                              }`}
                              onClick={() => !seat.isOccupied && !seat.isDisabled && handleSeatSelect(seat.id)}
                              disabled={seat.isOccupied || seat.isDisabled}
                            >
                              {seat.number}
                            </button>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button 
                  onClick={handlePayment} 
                  disabled={!selectedDate || !selectedTime || selectedSeats.length === 0} 
                  className="bg-[#ff9999] text-[#2c0a0a]"
                >
                  Pagar y Generar Boletos
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      {paymentComplete && selectedMovie && (
        <Dialog open={paymentComplete} onOpenChange={setPaymentComplete}>
          <DialogContent className="bg-[#4d1a1a] text-[#f5e6e6] border-[#801515] max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#ff9999]">Boletos Generados</DialogTitle>
              <DialogDescription className="text-[#d68f8f]">
                ¡Tu compra ha sido completada! Aquí están los detalles de tu reserva:
                <p className="mt-2">
                  <strong>Pelicula:</strong> {selectedMovie.title}<br />
                  <strong>Fecha:</strong> {selectedDate}<br />
                  <strong>Hora:</strong> {selectedTime}<br />
                  <strong>Asientos:</strong> {selectedSeats.join(', ')}
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
