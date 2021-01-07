using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace hvacshow.OtherClass
{
    public class EncDec
    {
        private string c_key = "TSHPANDA1004";
        private string MD5_key = "TSHPANDA-1004";
        private string c_iv = "TshpanDA2008";
        public string EncryptText(string openText)
        {
            RC2CryptoServiceProvider rc2CSP = new RC2CryptoServiceProvider();
            ICryptoTransform encryptor = rc2CSP.CreateEncryptor(Convert.FromBase64String(c_key), Convert.FromBase64String(c_iv));
            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    byte[] toEncrypt = Encoding.Unicode.GetBytes(openText);

                    csEncrypt.Write(toEncrypt, 0, toEncrypt.Length);
                    csEncrypt.FlushFinalBlock();

                    byte[] encrypted = msEncrypt.ToArray();

                    return Convert.ToBase64String(encrypted);
                }
            }
        }

        public string DecryptText(string encryptedText)
        {
            RC2CryptoServiceProvider rc2CSP = new RC2CryptoServiceProvider();
            ICryptoTransform decryptor = rc2CSP.CreateDecryptor(Convert.FromBase64String(c_key), Convert.FromBase64String(c_iv));
            using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(encryptedText)))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    List<Byte> bytes = new List<byte>();
                    int b;
                    do
                    {
                        b = csDecrypt.ReadByte();
                        if (b != -1)
                        {
                            bytes.Add(Convert.ToByte(b));
                        }

                    }
                    while (b != -1);

                    return Encoding.Unicode.GetString(bytes.ToArray());
                }
            }
        }

        public string HMACMD5Generator(string plaintext)
        {
            var data = Encoding.UTF8.GetBytes(plaintext);
            var key = Encoding.UTF8.GetBytes(MD5_key);
            var hmac = new HMACMD5(key);
            var hashBytes = hmac.ComputeHash(data);
            return System.BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}
