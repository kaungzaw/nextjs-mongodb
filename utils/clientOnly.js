import { useEffect, useState } from "react";

function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default function clientOnly(Component) {
  return function Comp(props) {
    return (
      <ClientOnly>
        <Component {...props} />
      </ClientOnly>
    );
  };
}
