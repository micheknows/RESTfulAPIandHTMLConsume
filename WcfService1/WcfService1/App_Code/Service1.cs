using System;
using System.ServiceModel;


[ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
public class Service1 : IService1
{
    int secretNumber = 0;

    
	public int SecretNumber(int x, int y)
    {
        DateTime currentDate = DateTime.Now;
        int seed = (int)currentDate.Ticks;
        Random random = new Random(seed);
        secretNumber = random.Next(x, y);
        return secretNumber;
    }

    public string checkNumber(int x, int y)
    {
        if (x == y) return "correct";
        else
            if (x > y) return "too big";
            else return "too small";
    }

    public int GetNumber()
    {
        return secretNumber;
    }

}
