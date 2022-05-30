using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;


[ServiceContract]
public interface IService1
{

    [OperationContract]
    [WebGet(UriTemplate = "SecretNumber?x={x}&y={y}", ResponseFormat = WebMessageFormat.Json)]
    int SecretNumber(int x, int y);

    [OperationContract]
    [WebGet(UriTemplate = "checkNumber?x={x}&y={y}", ResponseFormat = WebMessageFormat.Json)]
    string checkNumber(int x, int y);

    [OperationContract]
    [WebGet(UriTemplate = "GetNumber", ResponseFormat = WebMessageFormat.Json)]
    int GetNumber();
}

