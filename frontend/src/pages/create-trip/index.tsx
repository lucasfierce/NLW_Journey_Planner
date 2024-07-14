import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmedTripModal } from './confirmed-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {


    const navigate = useNavigate()
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmedTripModalOpen, setIsConfirmedTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'john@acme.com'
  ])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal(){
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal(){
    setIsGuestsModalOpen(false)
  }

  function openConfirmedTripModal(){
    setIsConfirmedTripModalOpen(true)
  }

  function closeConfirmedTripModal(){
    setIsConfirmedTripModalOpen(false)
  }
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    const data = new FormData(event?.currentTarget)
    const email = data.get('email')?.toString()

    if(!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }
   
  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(newEmailList)
  }

  function CreateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/trips/123')
  }
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      
      <div className="max-w-3xl w-full px-6 text-center space-y-5">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er logo" />
        </div>
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>

        <div className='space-y-4'>
          < DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}/>

          { isGuestsInputOpen && (
            < InviteGuestsStep 
                openGuestModal={openGuestsModal}
                emailsToInvite={emailsToInvite}
                openConfirmedTripModal={openConfirmedTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er, você automaticamente concorda 
        <br/> 
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a>  e <a href="#" className="text-zinc-300 underline">políticas de privacidade.</a></p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal 
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestsModal={closeGuestsModal}
            removeEmailFromInvites={removeEmailFromInvites}
            />
      )}

      {isConfirmedTripModalOpen && (
        <ConfirmedTripModal 
            closeConfirmedTripModal={closeConfirmedTripModal}
            CreateTrip={CreateTrip}/>
      )}
    </div>
  )
}


