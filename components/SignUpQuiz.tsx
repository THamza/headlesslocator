"use client";
import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const SignUpQuiz = ({ onQuizSuccess }: { onQuizSuccess: () => void }) => {
  const methods = useForm();
  const emailMethods = useForm();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isRegistrationRequestLoading, setIsRegistrationRequestLoading] =
    useState(false);

  useEffect(() => {
    if (captchaValue) {
      methods.clearErrors("captcha");
    }
  }, [captchaValue, methods]);

  const onSubmit = (data: any) => {
    if (captchaValue) {
      if (
        data.answer1 === "douglas harding" &&
        data.answer2 === "true seeing"
      ) {
        onQuizSuccess();
      } else {
        setShowDialog(true);
      }
    } else {
      setError("captcha", {
        type: "manual",
        message: "Please complete the CAPTCHA.",
      });
    }
  };

  const handleEmailSubmit = async (emailData: any) => {
    setIsRegistrationRequestLoading(true);
    const registrationRequestData = {
      email: emailData.email,
      message: emailData.message,
    };
    const res = await fetch(`/api/registration-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationRequestData),
    });
    setIsRegistrationRequestLoading(false);
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6">Quiz</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded shadow"
        >
          <FormItem className="mb-4">
            <FormLabel>
              Who first coined the term, "The Headless Way"?
            </FormLabel>
            <FormField
              name="answer1"
              render={({ field }) => (
                <Controller
                  name="answer1"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="douglas harding"
                          className="mr-2"
                        />
                        Douglas Harding
                      </label>
                      <br />
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="richard lang"
                          className="mr-2"
                        />
                        Richard Lang
                      </label>
                      <br />
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="alan watts"
                          className="mr-2"
                        />
                        Alan Watts
                      </label>
                    </div>
                  )}
                />
              )}
            />
          </FormItem>

          <FormItem className="mb-4">
            <FormLabel>
              What is the core practice of "The Headless Way"?
            </FormLabel>
            <FormField
              name="answer2"
              render={({ field }) => (
                <Controller
                  name="answer2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="true seeing"
                          className="mr-2"
                        />
                        True Seeing
                      </label>
                      <br />
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="meditation"
                          className="mr-2"
                        />
                        Meditation
                      </label>
                      <br />
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="yoga"
                          className="mr-2"
                        />
                        Yoga
                      </label>
                    </div>
                  )}
                />
              )}
            />
          </FormItem>

          <FormItem className="mb-4">
            {errors.captcha && !captchaValue && (
              <FormMessage className="text-red-500">
                {errors.captcha.message as string}
              </FormMessage>
            )}
            <ReCAPTCHA
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                "6LfmUMohAAAAAJX6xEB81OugU0JIzYrKto3TzgcG"
              }
              onChange={(value) => {
                setCaptchaValue(value);
              }}
            />
          </FormItem>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </FormProvider>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank you for your interest 🙏</DialogTitle>
          </DialogHeader>
          <FormProvider {...emailMethods}>
            <form
              onSubmit={emailMethods.handleSubmit(handleEmailSubmit)}
              className="flex flex-col gap-4"
            >
              <FormItem>
                <FormLabel>
                  Enter your email and we will reach out to you asap
                </FormLabel>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <Controller
                      name="email"
                      control={emailMethods.control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      )}
                    />
                  )}
                />
                {emailMethods.formState.errors.email && (
                  <FormMessage className="text-red-500">
                    {emailMethods.formState.errors.email.message as string}
                  </FormMessage>
                )}
              </FormItem>

              <FormItem>
                <FormLabel>Enter your message</FormLabel>
                <FormField
                  name="message"
                  render={({ field }) => (
                    <Controller
                      name="message"
                      control={emailMethods.control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your message"
                        />
                      )}
                    />
                  )}
                />
                {emailMethods.formState.errors.message && (
                  <FormMessage className="text-red-500">
                    {emailMethods.formState.errors.message.message as string}
                  </FormMessage>
                )}
              </FormItem>
              <Button
                type="submit"
                className="w-full"
                disabled={isRegistrationRequestLoading}
              >
                {isRegistrationRequestLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpQuiz;
