import Icon from '@components/icon'
import { oauthUrl } from '@lib/client/oauth';
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface AuthProps {
  url: string;
  readonly children: ReactNode;
}

const AuthLink = ({
  url = "",
  children
}: AuthProps) => {
  const router = useRouter();
  return (
    <button onClick={()=>router.push(url)} className="btn btn-primary gap-2 w-3/4 hover:btn-success">
      {children}
  </button>
  );
};

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
export const OAuthGithub = () => {
  return (
    <AuthLink url={oauthUrl("github")}>
      <Icon name="github" fill="white" />
      <span className="text-lg">Sign in with Github</span>
    </AuthLink>
  )
}

// https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
export const OAuthGoogle = () => {
  return (
    <AuthLink url={oauthUrl("google")}>
      <Icon name="google" fill="white" />
      <span className="text-lg">Sign in with Google</span>
    </AuthLink>
  )
}
