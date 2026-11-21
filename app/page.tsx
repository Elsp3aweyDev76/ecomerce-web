import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import React from 'react'

function Home() {
  return (
    // <header className='bg-shop-light-pink'>
      <Container className='bg-shop-light-pink'>
        {/* <Logo /> */}
        <h2 className='text-xl font-semibold'>home</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, blanditiis laboriosam. Voluptatum sapiente consequuntur quaerat labore eius aut quam earum sunt. Culpa et delectus similique magnam quidem cupiditate vitae hic totam ducimus, tempora iure deleniti rerum autem ea molestias nesciunt ad ipsam eligendi eos distinctio praesentium maxime alias! Optio, quas!</p>
        <Button > checked out</Button>
      </Container>
    // </header>
  )
}

export default Home
  