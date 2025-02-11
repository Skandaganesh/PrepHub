import React from "react";
import BackgroundAnimation from "../../BackgroundAnimation";
import Navbar from "./Navbar";
import Footer from "./Footer";


const exploreItems = [
  {
    title: "Roadmaps",
    description: "Step-by-step guides to help you navigate your career path.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhIQExIWFRUVFhUYFxgTGRUWFxkVFRUYFhgWFRgYHSggHR0lHRUVITEhJSkrLi4uGB8zODUsNygtLisBCgoKDg0OGhAQGi0eICYtNzAtLS8tKy0tMC0rNy0vNy8tLS0tKysvLzcvLy0tKy0tLS0rNS4tKzUtLS0tLS0tLf/AABEIALwBDAMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwIDCAH/xABIEAABAwIDBAYFBwgKAwEAAAABAAIDBBEFEiEGMUFREyJhcYGRBzJCobEUI1JygpLBFhdTYrLR0/AVJDNUc5Oiw9LhQ0TxY//EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAqEQEBAAIBBAAEBQUAAAAAAAAAAQIRAwQSITETQVFxBTJhkbEigaHh8f/aAAwDAQACEQMRAD8A3iiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIixMTr2wxmRwJ1Aa1vrOe42a1vaSQkmy3TLRQM+IV8bTM+njcwC7mRvcZQ0amxIyuPZopijqmSxslYczHtDmnm1wuCrZpJdu5ERRRERAREQEREBERAREQEREBERAREQEREBERARFE4wXPfFTAlrZMxeRoSxgHVB7bqybokG1cZOUSNLuQcL+S7lGS4DTFuURtHIjQ+e9dWzNTI5kkchzOhkdHmO9wFi0ntsR5K2TW4qYREWUEREBQ+1LXCETNGYwSMmy8ww9YfdLvJTC4yWsb2txvut2qy6u0s3NKpiW3lG2EvYXPeRZseVwcXEaAm1t/aey6m9nKF0FLBC71mRtDvrWu63Zcla2hpaKDEPn6mFkELukYXyM6x/8bBrqWkkn6o5hW6p9JeDs31YP1GSv/YYV05JjPGLnx3K+cltRUR3pbwjhLI7uhkH7QC6p/S7hrd7Kn/KA/acFz1XVsBFr2X0vUDbF1PVgHcTGwA915Fzb6WKMi4pa0g7iIWkEdnziaov6IigIiICIiAiIgIiICIiAiIgIiICIiAofaNrmtZUM9aF1+9rtHA9m5TC4yMDgWkXBBBHMHQrWN1diqVe2gbGS2I5+0jLfw1PuUvsvSOjp2l/9pITI++/M/XXwsqvBgJNWIHDqMOdxO4sHqjxJA8DyV9BC7c3ZjJMfu1da8PqIi87IiL47cg03t36VKgTS01FaNsbnMdMQHPc9pLXdGD1QAQRcg37OOvcRrKmeMzVM8zw8kR5y57XuaRnAu4BoaHNvYcQO7FxhwNRUFpuDNMQRxBkcQfJfZox8niflAPSStuIyC4ZYz1pr2fYmwba7bk3ObTrJpHPDqF9RLHBTxNzndqTfKMznPLjlAABOgAtzVr/ACIsWuqKyKMi2kTGtA7icnnlUN6PZSMQpgDbpC+I232ljcz3ZgfBWLBadrj1tXcSdSTzJSji/ZqgJBkq6iQjcQ4Hy+bdZdpwDDTv6eT6zpD8AFccOwhhtoFN0+Bs5LO1a1/J7DP7vKftS/8ANPycwz+6y/el/iLbEeBs5LtGCR8gpsS6IiyCIiAiIgIiICIiAiIgIiw8XrhBC+Y65RoOZJsB5kKW6m61jjcrMZ7rLJCAqs0uzxnaJat7nvcL5AS1jAdwAHH+dd6xcUppcPAqIHOdE0jpInG4yXsS2+4/z2Ln35e7PD0fA47eyZ7y+3jf03/rS4krUu1npfLJHw0UTXZSWmWW+UuBscjBYkXvqSO6y2rHIHsD2m4c0Fp7CLgrSe3no2lbJJU0bS9jiXPhHrsJNz0f0m8cu8cL8O+Ovm8tQFTt3i04kc6v6IAeq0siJJ9mIMb0jj23sOJGihxjEr79NVVbzyEriPEvd+CwoauSNssYsBIMsjXNadWuuPWF2uBG8WI1XaaRsj2Mp87y4eo8Na4OG9oIdZ97XB0Jva1100jvhoap1nGCpew3IyiQXvuIcWOB3DhqvkuFVN+pTVLRyc17zfvDG/BZmG7R1NP8xIzpGM06KcOa5nMMd60fdqP1VZMNxSmnIDJhG4+xUBrTfk2S+R3+k9il2KnLTVDR1Iqxh/W6S3uY1fYcQqGt609aw/quky9m94Wy2YFUcHAHuIPxXM4PXDj73D8VNjWNPtNWg9bEKtg7JZXa8rGQLsm2wrjdn9IVDmHQkvcDY79M34rYxw6tHA/ecup1FV/Q/wBR/cm/0Gp5GxaCN7nHkWBo8LPcT5BSLsPqJy3oqWRrALADpCwGwzPc+TqguIuSMo0Ggsti/J63kR9py634ZVu3277EnzJTYgNm8JFE75ZM5plY09FGwhwa9zS3PI8dUkXNmtLtdSRaykMAjIspCLZiRxu8lx7fwU7QYEW8FBJYTwVnpCoihoSFN08dlKrKC+r4F9WQREQEREHCWVrRdxsO1YX9LxX9rvtoutzOlmcHepHbTmTz9/ks807LWyjwV8OPdnnvt8R9hma4XabhdirdRmp6qIg9SWzHDhqdD5n4qyJW8Mrdy+4IiKNiIiAofa2nL6WUDe0B33CCfcCphfHNBFis5TuljfHncM5nPldsTCcQZPG2Rh3gXHFruIKhtvcQYymfFvkmGRjRvN9CbcvxIVQxSnfTTyRtc5tjdpaSLsOo1Hl3grlsfQOqa0yvJc2GziXEm7tzBc9tz9leac9y/o15fWy6DDinx5lvH3J/EbIwum6KGGLf0cbGfdaG/gu6WIO3+a7EXrfHt3dqltRsTSVYJlj69tJY+rIOVz7Q7HArU+0XowrIczobVMfJotKB2xn1vskk8gvQq6pYGnv5hWZWI8pU1R0bniSFsl9HNlzhwI5EEOa7+SFxgpmPa49Kxrhchj8wzNAv1HgFubhlcW34E7l6N2k2PpasfPwh5tpI3qyt7nDUjsNx2LU+0vovqobyUx+URj2bATAfV3P+zr2LcylRWsE2nrKTKIpTk3iOTrxm2/K0+r3tIWytnPSxTusypjMR+kLvj8wMzfEEcytTfLpmxupy5wZfWN4uGuB1Ia4dR195FjzX2VkBjYWGQS7nscGuaf1o3tseXVLeO8q2Qen8PxGmma17HNcHeqQQWu+q4aHwKzTTM5BeWqKvq6KRwY6SB4tnY9pAPEdJG8WOnMdy2Tsr6UAbRzlsLubiTA77Ru6LxJb2hYuKttGjZ9FfPkTOSwqHHY3nI8Fj9ND27iDxB5jRSrXA6hZHR8iZyXIUzeS7kQcBEFyAX1EBERAREQEREEWZRFO7No2QA35H+bqTzC176KPxqnzMzDe3Xw4/v8FXKmSzHHkD5rcm3hz5rw5XHW57jOqqltRWQxsN2xHO5w3Xbrp2XsPFWZVnZKmbFC6oeQ3NxcQAGN4kndc38govHPSrhsF2xudUPHCEXZ/mOs0/ZupZ9Ho4d3Huvur0i0Ti/pjrn3EEcUDeZvK/zNmj7pVYxbHcWka2SeeqyONgSXxRuNr6NYGtOnYnZXZ6Vqq6GPWSVjPrua34lQ9RtthbNHVsF+Qe1x8m3Xmymp4n3dLMGG+7JJI89osA23e4HsXTO1gcQxxc3gXNDD90OdbzV7B6Nk9JGED/ANtp7myH4NXSfShg/wDeT/lTf8FoKN1JYZmTl1hfLJE0X42BiJt4rEhy3GYEtvrlIBt2EggHwKvZBuzafavDKoRmGoBlBygFsjczTwu5oFwfiVnbHbUYTTwBprIRI855LkjrO9m5HAWHmtHVJpsvzbZg64/tHxubb7LGm666VkJv0kj2brZI2yDtveRluHNc5wYzO5vRl1Od4Zw31K9O0+1WHP8AUrKc90sf71Iw1kT/AFZGO+q5p+BXk6qZGHWY4vbYauZkN+Iy5nfFZEeGsLS9tRT3AuW3lY7de3XiAJ4aE6rfY871gi8o4dU1RcI4ZpWk7g2UxjTXeXAKWkxvGaYAuqapoOgL5XSA24AuLgnYPTC6pYGu7+YXnak22x5wzR1E72g2JbDHIL77E9EddR5rlJ6SMaaS11SWkbw6KEEcdQWKdlG19s9h6esaS8ZJrWZOwa34CQe23sOvIhaCxXD5KeaWnlAD43FrrG4vzB5EEHxVkqdpMfmYc0tWWEXvHF0Yy2vcPjY3S3G6q9NF0jrGRjL3JfKXW5m5a1ziT2AkrcmkZNFMyR0cdVLKImscxjm9cxaEssw3uzNvYCDY6EWWApCGpFNPHLBI2UxkOa58ZDRINxax+pymxBIGoGmiwXvc9xJJc97iSd7nOcbk9pJKou/o5xt75GYdIbteHfJ3HfFIAXBn+G6xGXgbWWyNntoSdCdRoe8LXeyGBuo3ivqhkexrjDCfXzOaR0sw9hoBNmnrE8BbXK2fnfe5vqb+azdUbspasPCyVT8GqzYK0U01wsWKyERFAREQEREBERB8IWu9tcRjpoZ3BwdkcG2BBOYgOax1tx1b4G6mfSTtMaGkc9n9rIejivwcQTmI/VAJ77DivOb6mQhwc9xDn53XJN5NRnN97usde1bwjjzcM5Nb+TPxvaCqqyOnlLmi2WMdWNoG4NYNNOZue1dGHQ05DnzyuaG2syNuaSS/BpPUaObnE9gK7MDFpRMac1EcPzkjBcNyt3GRwBsy9r3Gu7isSsqHSPfI4NBe4uIYA1oub2a0aADcAtupFUFj+kiLmEElpzXc3l1gBc24gDuClsM2fq6y9QTZhJBnqHOsSN4aTdzyNdGg2trZYOCUQnqKeAmwlljYe5zwDbwJWytqay1S6njaGti+bY0eqxjOqA0dtiVLRXotj6Rvrzyyn/8AJrIW/efnJ+6FlMwjD2nSma6305J3HxDXtb/pUtQYYX6uN+9WShwJvJZ8/VVNbS0nCkg8Y3n4lfXUdKf/AE4fBkjfg4LZNPgTOSzWYEz6IUGon4RQnU0jB9V9U33dLb3Lql2fw53/AI5Wf4c4/wByN63N/QEX0QuD9moDvaE2NLO2SojulqG9/QyfAMWO/YuL2asj68BHvbIVuiTY6mPsBYsuw0J3EjuJTuo01LsTJ7NTTu+t07f9sroOxNUNzqc90rR+2AtwS7CfRkcPG/xWHLsRON0nmB+5Xuo1UzZbEW+oG/ZqKdvxlC637KYg43dE0k7yailJ8SZVs6TZGqHtA+C6HbNVXZ5f9q91GvPyRrnaP6MW+nPCbd1nld8WxUvt1FO0dhlef9LLe9Xv8nKnn5Bcm7MTHe4+Fh8ApuioQbIUjdZJ5pOyNrIW/ednPuClKOogp9KWFsbvpMu+XXnM8kjuaQOxWGPZEn1rnvufipKm2XA4IKT8klmPW0F725nm48VYMMwe1tFa6bAgOCk4MNA4KbEVh9EQp+lYQuyKlAWQ1tlLR9C+oigIiICIiAiIg0r6ep3Gakjv1QyV1u0uYL+TfetWLbvp6oT/AFSo4AyxnveGvb+w9aiXXH0ic2bjq3x1sdM5ob8mc+dptmfBFq4M0JvqNBbeNVBrMwjWaNhmdC2RwjfI2/VY8gEuAcLt3Ei/BfcaoBBPNAHtkEby0PYQWubva4EEjcRccDcKjqw+rMMsUw3xyMeBzyODre5bQ2ohb8s6dpvHUsjmjcNxDmgGx7xf7QWp1sjYqr+WUZoCf6xS5pKe+98R9eIdoJ0728ipRacGI0VvoANFr/BarcrphtRuWaqxxMC7lgGtaxt3HuA3lYhxWU6tjFu25/cvHy9Vx8eXbfN+km7/AIdMePLKbTSKJhxixtI3L28PEKVa4HUagrfD1HHyy9l9e/r+yZYZY+31ERdmBERAXEsHJckQcOibyC+dC3kuxEHX0LeS5CMclyRB8DQvqIgIiICIiAiIgIiICIiCsekTBDV0U0LRd+XPH/iR9YDx1b4rzSCvXUrbheePSns58lqzKwWhqM0jbbmvveRnmcw7Hdi3hfkKYpeeOhNHE9jnMq2yObIx2dzZIzq2RhAyttoLEgnrb9FELMwerZFPFLJE2ZjXAvjeAWvbuIseNtR2gLaMNZOHV0kEsc8Tsskbg5p7RwPMEXBHEErsxt1MZ5TTZxCXExiQAODTrl0J0B0B32tfVYSDb76iOpiGJU4sHG1TGN8U3E/VN737QeJtMYRXblqPZLaOShm6VozxvGWaM7pI+Wulxc2PfwJWyZGRtayqpnZ6WXVjuLHcY38QQbjXlbfvzYL1hkIleXO1DQNO/d+Kng0blX9l6tpH1gCO8XuP55Kwr5vQSfDuV/Nbd/fbvzfm18teGBidC17HDdod3xCwNlah2V8Lt8Z07jfTwIPmpqokDWucTYAEnyUDso0uM03BzgB73H4hXlknUcdx93e/t/1cPPFlv9P3WJERe1wEREBERAREQEREBERAREQEREBERAREQEREBVvbXZxlbTvp3WBPWicfYlANj3G5B7CVZFxkZcWQeSqylfFI+KRpa9ji1zTwcDY//V0rc3pc2PMrDXwt+djFpmt3vjb7YHFzR5t7gtMrrLtE7gOORRQ1NLPAJopm3GXK2SOVvqvY8g6cxr7yDBD+fDein59o+loWUU0QkdC7+rzZsr4mH1oyLHO3TdccPohUQCsexu1LqN7mPb0lNLpNEeI3Z2cnj32tyIrz2EaEEaA6gjQ7jrwXFB6AwiJrWB8MnSQP68Mg3gHex3JwI+PEFTsWMyAWIDu3cVobY7a2Wic5pu+B5+cj5H9JHycPeNDwI3JDK1zWvaQWuAII3EEXBHgvzH4lOXpeb4nHdTL+Xv4O3kw1lPT5jWJySHITZunVbxPbz4K04PTCOJjOIFz9Y6lU6mIM2Y7gb+W5Wykqbr1/hmGecvNyXdviM9VZNYYpJFxY665L6zxiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg6aiO+o3j3jktCelDY35JJ8qgb/VpXagbopD7PY0ndyOnJegVH4nQxyMfHI0PjkBa9p3WKsuh5SRWXbnZOSgny6ugeSYZOY+g/wDXHvGvMCtLqiwY3tOaqnhiniDp4eq2pzWeYuEcjcvW49a43dpvAEfhv5EXB8QQfFAf5CsePbTtrKeJs8Oari6vylpAzxDc2Vtus7frpz4kEK2tpejLHc8D6Z560ILm34xH/iTbuLVq0FdsFQ9hJY4tJa5pI0u1ws4eIK8vWdLOp4rhf7OnFydmW25mPzxNrIJBNDufk3xvG8PG+3b28rFTWFYmDbVaR2a2iqKGXpoTobB7HepI36Lh52O8eYO0sOngqozVUPs/21OfXjJ4tA3t32t4ch1w45x4zGeozllcrbWwqSqupBjrqiYTiwNtVaaOrBSxEoi4Mfdc1AREQEREBERAREQEREBERAREQEREBERAREQEIREEHtBgkNRC+mmbmjfuPFrhuc08COB/7XnbarZ2ahnMEouN8bwOrIz6Q7RuI4HsIJ9SPaCLFV3avZ6nq6aSKYE5QXMcLB7HNBs5pIPdyIWsboeZUWyvzeUn6Wf70X8NPzeUn6Wf70X8Nb7oiv1+0NNVUbY6mIirgAbDNC1gD4/oTi4GnMc7i1yDVVsr83lJ+ln+9F/DVhj2AoH4eWlhD4nkiZuQSndo92WzhY2sRwHHVTug0oszCcTmppWzwPLJG7iNxHFrhuLTxBV+/N5SfpZ/vRfw0/N5SfpZ/vRfw1e6CYwPGYMSGaPLBWgXfFezJrb3xE8feOP0lM4dibmuLHgtc02IdoQe1VGLYCma5r2z1DXNILXNdGCCNxBEehWwRhbJ6ZkkrnOlYMvS9UPcGut17NDT5d1ljwqWoa4HipWOQFVqgoA3c53iR+5TdOy3EqUZyL41fVAREQEREBERAREQEREBERB//9k=", // Replace with actual image
    link: "/roadmaps",
  },
  {
    title: "Resume ATS",
    description: "Check your resume compatibility with ATS systems.",
    image: "data:image/jpeg;base64,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", // Replace with actual image
    link: "/resume-ats",
  },
  {
    title: "Resume Templates",
    description: "Professional templates to build your resume effortlessly.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPjgHmD1pvy2JPclCR2QkzNJDRDE8DIZOzg&s", // Replace with actual image
    link: "/resume-templates",
  },
  {
    title: "Internship Openings",
    description: "Latest internship opportunities from top companies.",
    image: "data:image/jpeg;base64,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", // Replace with actual image
    link: "/internships",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
        <Navbar/>
        <BackgroundAnimation/>
      <h1 className="text-4xl font-bold text-center mb-8">Explore</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exploreItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="text-gray-400 mt-2">{item.description}</p>
          </a>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Explore;
