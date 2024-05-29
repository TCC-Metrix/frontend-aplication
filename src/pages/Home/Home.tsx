const Home = () => {
  return (
    <div>
      <div>
        <div>
          <h1></h1>
          <p></p>
        </div>
        <div>
        <table className="table-container ">
            <thead>
              <tr className="first-line ">
                {headersList.map((item, index) => {
                  return <th key={index}>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {isLoadingUseOutputData ? (
				<td colSpan={5}>

					<RotatingLines
					  visible={true}
					  strokeWidth="5"
					  animationDuration="0.75"
					  ariaLabel="rotating-lines-loading"
					  strokeColor="#99aebb"
					  width="30"
					/>

				</td>

              ) : (
                <>
                  {movementData && movementData.length > 0 ? (
                    movementData.map((item, index) => (
                      <tr key={index}>
                        <td className="text">
                          <p className="td-text">{item.code}</p>
                        </td>
                        <td>{item.description}</td>
                        <td>{formatDate(item.outputDate)}</td>
                        <td>{item.reason}</td>
                        <td>{item.employee !== null ? item.employee : "-"}</td>
                        <td>{item.area !== null ? item.area : "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={headersList.length + 1} className="text">
                        Nenhum instrumento selecionado
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home