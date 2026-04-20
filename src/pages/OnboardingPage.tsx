import { OnboardingForm } from '@/components/OnboardingForm'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Set up your clinic</h1>
          <p className="text-sm text-gray-500">
            This takes 2 minutes. We use this to generate relevant content.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  )
}
