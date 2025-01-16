//rafce
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import useEcomStore from '../../../store/zcom-store'
import CheckoutForm from '../../components/CheckoutForm'
import { payment } from '../../api/stripe'

const stripePromise = loadStripe('pk_test_51QfhXrHW8uCFAs8OPfR0VV0LT88k73LIVc6YqahqPDGjGU4KlV6FAdKDNgDim4ZVqgxegCWKuF956nMatxx3RNhc00YfvXbx5C')

const Payment = () => {
  const token = useEcomStore((s) => s.token)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // code
    payment(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const appearance = {
    theme: 'stripe'
  }

  const loader = 'auto'

  return (
    <div>
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment
