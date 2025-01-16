import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import '../stripe.css'
import { saveOrder } from '../api/user'
import useEcomStore from '../../store/zcom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token)
  const clearCart = useEcomStore((state) => state.clearCart)

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const payload = await stripe.confirmPayment({
      elements,

      // }
      redirect: 'if_required'
    })
    console.log('payload', payload)
    if (payload.error) {
      setMessage(payload.error.message)
      console.log('Error')
      toast.error(payload.error.message)
    } else if (payload.paymentIntent.status === 'succeeded') {
      console.log('Ready or SaveOrder')
      // Create Order
      saveOrder(token, payload)
        .then((res) => {
          console.log(res)
          clearCart()
          toast.success('Payment Success')
          navigate('/user/history')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('Something Wrong')
      toast.warning('Payment has not complete')
    }

    setIsLoading(false)
  }

  // const paymentElementOptions = {
  //   layout: "tabs",
  // };

  const paymentElementOptions = {
    layout: 'accordion'
  }

  return (
    <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="stripe-button" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
