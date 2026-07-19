import { useState } from 'react'
import { Button } from '#/components/ui/Button'
import { FormField } from '#/components/ui/FormField'
import { Input } from '#/components/ui/Input'
import { Textarea } from '#/components/ui/Textarea'
import { useToast } from '#/components/providers/ToastProvider'
import { SITE } from '#/data/site'
import { m } from '#/paraglide/messages.js'

/** Contact form that hands off to the visitor's mail client via mailto. */
export function ContactForm() {
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const subject = encodeURIComponent(
      m.contact_mail_subject({
        site: SITE.shortName,
        name: name || m.contact_anonymous(),
      }),
    )
    const body = encodeURIComponent(message)
    window.location.href = `mailto:${SITE.author.email}?subject=${subject}&body=${body}`
    showToast(m.contact_toast())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-surface p-6"
    >
      <FormField label={m.contact_name()} className="mb-4">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={m.contact_name_placeholder()}
        />
      </FormField>
      <FormField label={m.contact_message()} className="mb-4">
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          placeholder={m.contact_message_placeholder()}
        />
      </FormField>
      <Button type="submit">{m.contact_send()}</Button>
    </form>
  )
}
