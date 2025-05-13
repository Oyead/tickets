export default function TicketSuccess() {
  const TicketNumber = Math.floor(Math.random() * 500);
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const ticketData = localStorage.getItem('ticketData');
  const parsedData = ticketData ? JSON.parse(ticketData) : null;

  if (!parsedData) {
    return (
      <div className="text-white text-center p-8">
        <p>No ticket data found. Please fill out the form first.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-cover bg-no-repeat bg-center px-4">
      {/* Background Patterns */}
      <img src="/src/assets/images/pattern-lines.svg" className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" />
      <img src="/src/assets/images/pattern-circle.svg" className="absolute top-[40%] right-[10%] md:right-[20%] w-24 md:w-40 pointer-events-none" />
      <img src="/src/assets/images/pattern-squiggly-line-top.svg" className="absolute top-10 -right-4 md:w-[390px] pointer-events-none" />
      <img src="/src/assets/images/pattern-squiggly-line-bottom-desktop.svg" className="absolute -bottom-7 -left-10 w-48 md:w-[380px] pointer-events-none" />

      {/* Content */}
      <div className="w-full text-center mt-6 max-w-2xl mx-auto">
        <div className="inline-block mb-4">
          <img src="/src/assets/images/logo-full.svg" alt="Logo" className="mx-auto w-32" />
        </div>

        <div className="headingText text-center px-2">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            Congrats,  <br />Your ticket is ready.
          </h1>
          <p className="text-white text-lg sm:text-xl mt-4">
            we've emailed your ticket to {parsedData.email}
            <br />
            and will send updates in
            <br />
            the run up to the event
          </p>
        </div>    

        <div className="flex justify-center mt-10">
          <div className="relative"> 
            <img 
              src="/src/assets/images/pattern-ticket.svg" 
              className="w-[400px]" 
            />
            <div className="flex flex-col">
              <img src="/src/assets/images/logo-full.svg" className="absolute top-5 left-2"/>
              <p className="text-white absolute top-13 left-[40px] text-xl opacity-75">{currentDate} / Austin,Texas</p>
            </div>
            <div className="flex flex-col">
              <p className="text-white absolute bottom-14 left-[69px] text-xl opacity-75">{parsedData.fullName}</p>
              {parsedData.avatar ? (
                <img 
                  src={parsedData.avatar} 
                  className="absolute bottom-5 left-1 w-[60px] h-[60px] rounded-2xl object-cover"
                  alt="User avatar"
                />
              ) : (
                <img 
                  src="/src/assets/images/image-avatar.jpg" 
                  className="absolute bottom-5 left-1 w-[60px] rounded-2xl"
                  alt="Default avatar"
                />
              )}
              <p className="text-white absolute bottom-5 left-[90px] text-xl opacity-75">{parsedData.github}</p>
              <img src="/src/assets/images/icon-github.svg" className="w-[20px] absolute bottom-[22px] left-[69px] cursor-pointer" alt="" />
            </div>

            <p className="text-white rotate-90 opacity-40 absolute right-0 top-[79px] -translate-y-1/2 whitespace-nowrap transform origin-left">#{parsedData.ticketNumber || TicketNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}